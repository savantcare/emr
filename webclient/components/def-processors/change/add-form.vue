<!-- Goal: Show multiple add rows along with remove each row. At end A. Reviewed B. Reset form C. Add more  -->
<template>
  <div>
    <!-- Start rendering the add form -->
    <el-form>
      <!-- Scenario: There are existiing rows in edit state. If there no such rows this form inside v-else creates a empty row -->
      <div v-if="cfGetClientTblNewRowsInEditState.length">
        <!-- _formDef.styleForEachRowInAddForm has the grid design like grid-template-columns: 1fr 1fr 1fr -->
        <!-- Start to process each row -->
        <el-form
          v-for="ormRow in cfGetClientTblNewRowsInEditState"
          :key="ormRow.clientSideUniqRowId"
          :id="`each-data-row` + _formDef.id"
          :style="_formDef.styleForEachRowInAddForm"
        >
          <!-- Start to process fields in the row -->
          <div v-for="(propFieldDef, id) in _formDef.fieldsDef" :key="id">
            <el-form-item>
              <!-- Start to process each field -->
              <el-card :span="propFieldDef.span" shadow="hover" :style="propFieldDef.fieldStyle">
                <!-- The following are the possible field types -->

                <!-- HEADING -->
                <div v-if="propFieldDef.fieldType === 'heading'">
                  <div v-if="propFieldDef.showFieldLabel">
                    <!-- the field printing happens lower so each field type can decide what format to apply -->
                    <h3>{{ propFieldDef.fieldNameInUi }}</h3>
                  </div>
                </div>

                <!-- AUTO COMPLETE  
              fetch-suggestions="propFieldDef.selectOptions This is per field since if there are 3 fields each may implement their select options on thier own -->
                <div v-else-if="propFieldDef.fieldType === 'autocomplete'">
                  <div v-if="propFieldDef.showFieldLabel">
                    {{ propFieldDef.fieldNameInUi }}
                  </div>

                  <el-autocomplete
                    v-model="value[propFieldDef.fieldNameInDb]"
                    class="inline-input"
                    :fetch-suggestions="propFieldDef.selectOptions"
                    :placeholder="propFieldDef.fieldNameInUi"
                    style="width: 100%"
                    :highlight-first-item="true"
                    @select="mfSetFldValueUsingCache($event.id, ormRow.clientSideUniqRowId, propFieldDef.fieldNameInDb)"
                  ></el-autocomplete>
                </div>

                <!-- multi-select-with-buttons -->
                <div v-else-if="propFieldDef.fieldType === 'multi-select-with-buttons'">
                  <div v-if="propFieldDef.showFieldLabel">
                    {{ propFieldDef.fieldNameInUi }}
                  </div>
                  <div
                    v-for="item in _formDef.fnGetAllSelectOptionsAndSelectedForAField(
                      propFieldDef.fieldNameInDb,
                      ormRow.clientSideUniqRowId
                    )"
                    :key="item.id"
                  >
                    <el-button
                      v-model="value[propFieldDef.fieldNameInDb]"
                      :type="item.selected ? 'primary' : 'plain'"
                      @click="mfSetFldValueUsingCache(item.id, ormRow.clientSideUniqRowId, propFieldDef.fieldNameInDb)"
                      >{{ item.value }}</el-button
                    >
                  </div>
                </div>

                <!-- SLIDER type field value[propFieldDef.fieldNameInDb] -->
                <div v-else-if="propFieldDef.fieldType === 'slider'">
                  <div v-if="propFieldDef.showFieldLabel">
                    {{ propFieldDef.fieldNameInUi }}
                  </div>
                  <div class="block">
                    <el-slider
                      v-model="value[propFieldDef.fieldNameInDb]"
                      :step="propFieldDef.fieldOptions.step"
                      show-stops
                      :min="propFieldDef.fieldOptions.min"
                      :max="propFieldDef.fieldOptions.max"
                      :marks="propFieldDef.marks"
                      :format-tooltip="propFieldDef.ft"
                      @change="mfSetFldValueUsingCache($event, ormRow.clientSideUniqRowId, propFieldDef.fieldNameInDb)"
                    >
                    </el-slider>
                  </div>
                </div>

                <!-- SELECT -->
                <div v-else-if="propFieldDef.fieldType === 'select'">
                  <div v-if="propFieldDef.showFieldLabel">
                    {{ propFieldDef.fieldNameInUi }}
                  </div>
                  <el-select v-model="value" filterable :placeholder="propFieldDef.fieldNameInUi">
                    <el-option
                      v-for="item in propFieldDef.selectOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="mfGetFldValue(ormRow.clientSideUniqRowId, propFieldDef.fieldNameInDb)"
                      @input="mfSetFldValueUsingCache($event, ormRow.clientSideUniqRowId, propFieldDef.fieldNameInDb)"
                    >
                    </el-option>
                  </el-select>
                </div>

                <!-- DATE -->
                <div v-if="propFieldDef.fieldType === 'date'">
                  <div v-if="propFieldDef.showFieldLabel">
                    {{ propFieldDef.fieldNameInUi }}
                  </div>

                  <el-date-picker
                    :ref="propFieldDef.fieldNameInDb"
                    format="MMM dd yyyy"
                    value-format="timestamp"
                    type="date"
                    style="width: 100%"
                    :class="mfGetCssClassNameForEachDataRow(ormRow.clientSideUniqRowId)"
                    :value="mfGetFldValue(ormRow.clientSideUniqRowId, propFieldDef.fieldNameInDb)"
                    @input="mfSetFldValueUsingCache($event, ormRow.clientSideUniqRowId, propFieldDef.fieldNameInDb)"
                    :placeholder="propFieldDef.fieldNameInUi"
                  >
                  </el-date-picker>
                </div>

                <!-- NUMBER -->
                <div v-if="propFieldDef.fieldType.includes('number')">
                  <div v-if="propFieldDef.showFieldLabel">
                    {{ propFieldDef.fieldNameInUi }}
                  </div>
                  <el-input-number
                    v-model="value[propFieldDef.fieldNameInDb]"
                    :ref="propFieldDef.fieldNameInDb"
                    :class="mfGetCssClassNameForEachDataRow(ormRow.clientSideUniqRowId)"
                    :value="mfGetFldValue(ormRow.clientSideUniqRowId, propFieldDef.fieldNameInDb)"
                    @input="mfSetFldValueUsingCache($event, ormRow.clientSideUniqRowId, propFieldDef.fieldNameInDb)"
                  ></el-input-number>
                  {{ propFieldDef.unitOfMeasurement }}
                </div>

                <!-- input/textarea -->
                <div v-if="propFieldDef.fieldType.includes('text')">
                  <div v-if="propFieldDef.showFieldLabel">
                    {{ propFieldDef.fieldNameInUi }}
                  </div>
                  <el-input
                    :ref="propFieldDef.fieldNameInDb"
                    :type="propFieldDef.fieldType"
                    :class="mfGetCssClassNameForEachDataRow(ormRow.clientSideUniqRowId)"
                    :autosize="{ minRows: 2, maxNumberOfRows: 10 }"
                    :placeholder="propFieldDef.fieldNameInUi"
                    :value="mfGetFldValue(ormRow.clientSideUniqRowId, propFieldDef.fieldNameInDb)"
                    @input="mfSetFldValueUsingCache($event, ormRow.clientSideUniqRowId, propFieldDef.fieldNameInDb)"
                  ></el-input>
                </div>

                <!-- Prop explaination
            Goal: Show remove button on the RHS of each row. Since element.io divides it into 24 columns. we are giving
            20 columns to input and 4 columns to remove button
            Remove should not come if there is only one _formDef.maxRow
          -->
              </el-card>
            </el-form-item>

            <!-- Just ended processing all the fields in the row -->
          </div>
          <el-button
            v-if="
              mfGetArOfDataRows() < _formDef.maxNumberOfTemporallyValidRows || !_formDef.maxNumberOfTemporallyValidRows
            "
            plain
            type="warning"
            style="float: right"
            @click="mfDeleteRowInEditLayerientSideTable(ormRow.clientSideUniqRowId)"
            >Remove</el-button
          >

          <!-- Just ended processing each row -->
        </el-form>
      </div>
      <!-- Scenario: There are no edit state rows. Then create a empty row for faster data input -->
      <p v-else>{{ mfAddEmptyRowInEditLayerientSideTable() }}</p>

      <!-- Form action buttons below the form -->
      <el-form-item>
        <el-button v-if="_formDef.showFormReviewedButton === true" type="primary" plain @click="mfOnReviewed"
          >Reviewed</el-button
        >

        <!-- Add. v-if makes sure that for Ct like chief complaint it will not display add if greater then 0 rows. !_formDef.maxNumberOfTemporallyValidRows makes sure that is a ct has not defined max Rows then the add button comes. -->
        <el-button
          v-if="
            mfGetArOfDataRows() < _formDef.maxNumberOfTemporallyValidRows || !_formDef.maxNumberOfTemporallyValidRows
          "
          type="primary"
          plain
          @click="mfAddEmptyRowInEditLayerientSideTable"
          >Add more</el-button
        >
        <el-button v-if="_formDef.resetForm !== false" type="warning" plain @click="mfOnResetForm"
          >Reset form</el-button
        >
      </el-form-item>
    </el-form>

    <!-- Goal: Show data at the time of sending to server -->
    <el-table
      v-if="cfGetClientTblApiSendingStateRows.length > 0"
      :data="cfGetClientTblApiSendingStateRows"
      style="width: 100%; background: #f0f9eb"
    >
      <el-table-column label="Sending to server">
        <div v-for="(propFieldDef, id) in _formDef.fieldsDef" :key="id">
          <el-table-column :prop="propFieldDef.fieldNameInDb" :label="propFieldDef.fieldNameInDb"></el-table-column>
        </div>
      </el-table-column>
    </el-table>

    <!-- Goal: Show data saved successfuly this session -->
    <el-table
      v-if="cfGetClientTblApiSuccessStateRows.length > 0"
      :data="cfGetClientTblApiSuccessStateRows"
      style="width: 100%; background: #f0f9eb"
    >
      <el-table-column align="center" label="Addded this session">
        <div v-for="(propFieldDef, id) in _formDef.fieldsDef" :key="id">
          <el-table-column :prop="propFieldDef.fieldNameInDb" :label="propFieldDef.fieldNameInUi"></el-table-column>
        </div>
      </el-table-column>
    </el-table>

    <!-- Goal: Show data of API that failed in this session -->
    <el-table
      v-if="cfGetClientTblApiErrorStateRows.length > 0"
      :data="cfGetClientTblApiErrorStateRows"
      style="width: 100%; background: #f0f9eb"
    >
      <el-table-column label="Attempted but failed to save">
        <div v-for="(propFieldDef, id) in _formDef.fieldsDef" :key="id">
          <el-table-column prop="propFieldDef.fieldNameUi" label="Attempted but failed to save"></el-table-column>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import allClientTbls from '../all-client-tables.js'
import allFormDefs from '../all-form-definations.js'
import { required, minLength, between } from 'vuelidate/lib/validators'
import { rowState } from '@/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'

export default {
  created() {
    /* Goal: init the values when the form is mounted. For e.g. when a form is mounted I want all slider values to be init so slider can show the current state.
      When add form is mounted 1st time this will return a empty array
      2nd time onwards it will return an array of data that came from vuex-orm
      This was first used for slider form control.
  */
    this.value = this._formDef.fnCreated(this.mfGetArOfDataRows())
  },
  data() {
    return { value: [] }
  },
  validations() {
    return this._formDef.validationsObj
  },
  props: {
    _formDef: {
      type: Object,
      required: true,
      validator: function (obj) {
        // id and fields must be present
        if (obj.id) {
          if (obj.fieldsDef) {
            if (Object.keys(allClientTbls).includes(obj.id)) {
              return true
            }
          }
        }

        return false
      },
    },
  },
  computed: {
    // allClientTbls[this._formDef.id] functions can not be directly called from template. hence computed functions have been defined.
    cfGetClientTblNewRowsInEditState() {
      const r = allClientTbls[this._formDef.id].fnGetNewRowsInEditState()
      return r
    },
    cfGetClientTblReadyToReviewedStateRows() {
      return allClientTbls[this._formDef.id].fnGetNewRowsInFormValidationPassState()
    },
    cfGetClientTblApiSuccessStateRows() {
      return allClientTbls[this._formDef.id].fnGetNewRowsInApiSuccessState()
    },
    cfGetClientTblApiErrorStateRows() {
      return allClientTbls[this._formDef.id].fnGetNewRowsInApiErrorState()
    },
    cfGetClientTblApiSendingStateRows() {
      return allClientTbls[this._formDef.id].fnGetNewRowsInApiSendingState()
    },
  },
  methods: {
    log(item) {
      console.log(item)
    },

    mfGetArOfDataRows() {
      const arOfObjectsFromClientDB = allClientTbls[this._formDef.id]
        .query()
        .where('ROW_END', 2147483648000) // if unlocked then only current rows should be shown
        .where('vnRowStateInSession', (value) => value > 1) // 2 is new on client.
        .get()
      return arOfObjectsFromClientDB
    },

    async mfAddEmptyRowInEditLayerientSideTable() {
      // TODO: this should be part of base class

      if (!this._formDef || !this._formDef.maxNumberOfTemporallyValidRows) {
        // if maxNumberOfTemporallyValidRows has not been defined then go ahead and add an empty row
      } else {
        const currentRowCount = allClientTbls[this._formDef.id].query().count() // Get number of rows. The number of rows has to be less then maxNumberOfTemporallyValidRows
        if (currentRowCount >= this._formDef.maxNumberOfTemporallyValidRows) {
          return
        }
      }

      const arFromClientTbl = await allClientTbls[this._formDef.id].insert({
        data: {
          vnRowStateInSession: 2, // For meaning of diff values read webclient/cts/def-processors/crud/forms.md
          ROW_START: Math.floor(Date.now()), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
        },
      })
      if (!arFromClientTbl) {
        console.log('FATAL ERROR')
      }

      this.mfSetFormFieldFocus()
    },
    mfSetFormFieldFocus() {
      // Ref: https://stackoverflow.com/questions/60291308/vue-js-this-refs-empty-due-to-v-if
      const firstField = this._formDef.fieldsDef[0].fieldNameInDb
      if (this.$refs[firstField]) {
        const lastElement = this.$refs[firstField].length
        // console.log('setting focus of', lastElement - 1, 'length is', lastElement)
        this.$refs[firstField][lastElement - 1].focus()
      }
    },
    // Cannot call allClientTbls[this._formDef.id] function directly from template so need to have a method function to act as a pipe between template and the ORM function
    mfGetFldValue(pClientRowId, pFldName) {
      return allClientTbls[this._formDef.id].fnGetFldValue(pClientRowId, pFldName)
    },
    mfSetFldValueUsingCache(pEvent, pClientRowId, pFldName) {
      // Ref: https://vuelidate.js.org/#sub-basic-form see "Withiut v-model"
      //console.log()
      let rowStatus = 0

      if (!pEvent) return

      if (pEvent.length > 2) {
        rowStatus = rowState.New_Changed_FormValidationPass // This implies valid is true
      } else {
        rowStatus = rowState.New_Changed_FormValidationFail // This implies invalid is true
      }
      // TODO: rowStatus has to be dynamic deoending on if the form is valid or not at this time

      allClientTbls[this._formDef.id].fnSetValueOfFld(pEvent, pClientRowId, pFldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/def-processors/crud/manage-rows-of-table-in-client-side-orm.js:133/fnPutFldValueInCache
    },
    mfGetCssClassNameForEachDataRow(pClientRowId) {
      const arFromClientTbl = allClientTbls[this._formDef.id].find(pClientRowId)
      /* TODO: this needs to check for 2456 or 2457 instead of 24
          invalid: organge
          valid: green
          in db: regular
      */
      if (arFromClientTbl && arFromClientTbl.vnRowStateInSession === rowState.New_Changed_FormValidationFail) {
        // New -> Changed
        return 'invalid-dirty-data'
      } else if (arFromClientTbl && arFromClientTbl.vnRowStateInSession === rowState.New_Changed_FormValidationPass) {
        return 'valid-dirty-data'
      }
      return ''
    },
    async mfDeleteRowInEditLayerientSideTable(pClientRowId) {
      await allClientTbls[this._formDef.id].delete(pClientRowId)
      this.mfSetFormFieldFocus()
    },
    mfOnResetForm(formName) {
      allClientTbls[this._formDef.id].fnDeleteNewRowsInEditState()
    },
  },
}
</script>

<style>
.invalid-dirty-data textarea {
  border-color: #e6a23c;
}

.valid-dirty-data textarea {
  border-color: #67c23a;
}

.validaionErrorExist .el-textarea__inner {
  border-color: #ff4949;
}
</style>
