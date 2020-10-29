<!-- Reference implementation -->
<!-- Goal: Show multiple add rows along with remove each row. At end A. Reviewed B. Reset form C. Add more  -->
<template>
  <div>
    <!-- Start rending the add form -->
    <el-form>
      <!-- Scenario: There are existiing rows in edit state -->
      <div v-if="cfGetClientTblNewRowsInEditState.length">
        <el-form-item v-for="ormRow in cfGetClientTblNewRowsInEditState" :key="ormRow.clientSideUniqRowId">
          <!-- Start to process each row -->
          <div v-for="(propFieldObj, id) in propFormDef.fieldsDef" :key="id">
            <!-- Start to process each field -->
            <el-col :span="propFieldObj.span" :class="ormRow.validationClass">
              <!-- There are 5 possibilities of field type -->

              <!-- Field type 1: Do the following when it is auto-complete type field 
              fetch-suggestions="propFieldObj.selectOptions This is per field since if there are 3 fields each may implement their select options on thier own -->

              <el-autocomplete
                v-if="propFieldObj.fieldType === 'autocomplete'"
                v-model="searchKeyword"
                class="inline-input"
                :fetch-suggestions="propFieldObj.selectOptions"
                :placeholder="propFieldObj.fieldNameInUi"
                style="width: 100%"
                :highlight-first-item="true"
                @select="mfSetFldValueUsingCache($event.id, ormRow.clientSideUniqRowId, propFieldObj.fieldNameInDb)"
              ></el-autocomplete>

              <!-- Field type 2: Do the following when it is multi-select-with-buttons type field -->
              <div v-else-if="propFieldObj.fieldType === 'multi-select-with-buttons'">
                {{ propFieldObj.fieldNameInUi }}
                <div v-for="item in propFormDef.fnGetSelectOptions(propFieldObj.fieldNameInDb)" :key="item.id">
                  <el-button
                    :type="item.selected ? 'primary' : 'plain'"
                    @click="mfSetFldValueUsingCache(item.id, ormRow.clientSideUniqRowId, propFieldObj.fieldNameInDb)"
                    >{{ item.value }}</el-button
                  >
                </div>
              </div>

              <!-- Field type 3: Do the following when it is heading type field -->
              <div v-else-if="propFieldObj.fieldType === 'heading'">
                <h3>{{ propFieldObj.fieldNameInUi }}</h3>
              </div>

              <!-- Field type 4: Do the following when it is select type field -->
              <el-select
                v-else-if="propFieldObj.fieldType === 'select'"
                v-model="value"
                filterable
                :placeholder="propFieldObj.fieldNameInUi"
              >
                <el-option
                  v-for="item in propFieldObj.selectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="mfGetFldValue(ormRow.clientSideUniqRowId, propFieldObj.fieldNameInDb)"
                  @input="mfSetFldValueUsingCache($event, ormRow.clientSideUniqRowId, propFieldObj.fieldNameInDb)"
                >
                </el-option>
              </el-select>

              <!-- Field type 5: Do the following when it is input/textarea type field -->
              <el-input
                v-else
                :ref="propFieldObj.fieldNameInDb"
                :type="propFieldObj.fieldType"
                :class="mfGetCssClassNameForEachDataRow(ormRow.clientSideUniqRowId)"
                :autosize="{ minRows: 2, maxRows: 10 }"
                :placeholder="propFieldObj.fieldNameInUi"
                :value="mfGetFldValue(ormRow.clientSideUniqRowId, propFieldObj.fieldNameInDb)"
                @input="mfSetFldValueUsingCache($event, ormRow.clientSideUniqRowId, propFieldObj.fieldNameInDb)"
              ></el-input>

              <!-- Do validation -->

              <div v-if="ormRow.isValidationError" class="el-form-item__error">Please enter minimum 3 characters.</div>
            </el-col>
            <!-- Just ended processing all the fields in the row -->
          </div>
          <!-- Just ended processing each row -->

          <!-- Prop explaination
            Goal: Show remove button on the RHS of each row. Since element.io divides it into 24 columns. we are giving
            20 columns to input and 4 columns to remove button
            Remove should not come if there is only one propFormDef.maxRow
          -->
          <el-col :span="4">
            <el-button
              v-if="mfGetArOfDataRows() < propFormDef.maxRows || !propFormDef.maxRows"
              plain
              type="warning"
              style="float: right"
              @click="mfDeleteRowInEditLayerientSideTable(ormRow.clientSideUniqRowId)"
              >Remove</el-button
            >
          </el-col>
        </el-form-item>
      </div>
      <!-- Scenario: There are no edit state rows. Then create a empty row for faster data input -->
      <p v-else>{{ mfAddEmptyRowInEditLayerientSideTable() }}</p>

      <!-- Form action buttons below the form -->
      <el-form-item>
        <el-button v-if="propFormDef.formReviewed !== false" type="primary" plain @click="mfOnReviewed"
          >Reviewed</el-button
        >

        <!-- Add. v-if makes sure that for Ct like chief complaint it will not display add if greater then 0 rows. !propFormDef.maxRows makes sure that is a ct has not defined max Rows then the add button comes. -->
        <el-button
          v-if="mfGetArOfDataRows() < propFormDef.maxRows || !propFormDef.maxRows"
          type="primary"
          plain
          @click="mfAddEmptyRowInEditLayerientSideTable"
          >Add more</el-button
        >
        <el-button v-if="propFormDef.resetForm !== false" type="warning" plain @click="mfOnResetForm"
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
        <div v-for="(propFieldObj, id) in propFormDef.fieldsDef" :key="id">
          <el-table-column :prop="propFieldObj.fieldNameInDb" :label="propFieldObj.fieldNameInDb"></el-table-column>
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
        <div v-for="(propFieldObj, id) in propFormDef.fieldsDef" :key="id">
          <el-table-column :prop="propFieldObj.fieldNameInDb" :label="propFieldObj.fieldNameInUi"></el-table-column>
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
        <div v-for="(propFieldObj, id) in propFormDef.fieldsDef" :key="id">
          <el-table-column prop="propFieldObj.fieldNameUi" label="Attempted but failed to save"></el-table-column>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import allClientTbls from '../all-client-tables.js'

export default {
  created() {
    console.log(this.propFormDef)
  },
  data() {
    return { searchKeyword: '' }
  },
  props: {
    propFormDef: {
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
  created() {},
  computed: {
    // allClientTbls[this.propFormDef.id] functions can not be directly called from template. hence computed functions have been defined.
    cfGetClientTblNewRowsInEditState() {
      return allClientTbls[this.propFormDef.id].fnGetNewRowsInEditState()
    },
    cfGetClientTblReadyToReviewedStateRows() {
      return allClientTbls[this.propFormDef.id].fnGetNewRowsInReadyToReviewedState()
    },
    cfGetClientTblApiSuccessStateRows() {
      return allClientTbls[this.propFormDef.id].fnGetNewRowsInApiSuccessState()
    },
    cfGetClientTblApiErrorStateRows() {
      return allClientTbls[this.propFormDef.id].fnGetNewRowsInApiErrorState()
    },
    cfGetClientTblApiSendingStateRows() {
      return allClientTbls[this.propFormDef.id].fnGetNewRowsInApiSendingState()
    },
  },
  methods: {
    mfGetArOfDataRows() {
      const arOfObjectsFromClientDB = allClientTbls[this.propFormDef.id]
        .query()
        .where('ROW_END', 2147483648000) // if unlocked then only current rows should be shown
        .where('vnRowStateInSession', (value) => value > 1) // 2 is new on client.
        .get()
      return arOfObjectsFromClientDB
    },

    async mfAddEmptyRowInEditLayerientSideTable() {
      console.log(this.propFormDef.fieldsDef)
      // TODO: this should be part of base class
      const arFromClientTbl = await allClientTbls[this.propFormDef.id].insert({
        data: {
          vnRowStateInSession: 2, // For meaning of diff values read webclient/cts/framework/crud/forms.md
          ROW_START: Math.floor(Date.now()), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
        },
      })
      if (!arFromClientTbl) {
        console.log('FATAL ERROR')
      }
      this.mfManageFocus()
    },
    mfManageFocus() {
      // Ref: https://stackoverflow.com/questions/60291308/vue-js-this-refs-empty-due-to-v-if
      if (this.$refs.description) {
        const lastElement = this.$refs.description.length
        console.log('setting focus of', lastElement - 1, 'length is', lastElement)
        this.$refs.description[lastElement - 1].focus()
      }
    },
    // Cannot call allClientTbls[this.propFormDef.id] function directly from template so need to have a method function to act as a pipe between template and the ORM function
    mfGetFldValue(pClientRowId, pFldName) {
      return allClientTbls[this.propFormDef.id].fnGetFldValue(pClientRowId, pFldName)
    },
    mfSetFldValueUsingCache(pEvent, pClientRowId, pFldName) {
      console.log(pEvent, pClientRowId, pFldName)
      const rowStatus = 24
      allClientTbls[this.propFormDef.id].fnSetFldValue(pEvent, pClientRowId, pFldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/framework/crud/manage-rows-of-table-in-client-side-orm.js:133/fnPutFldValueInCache
    },
    mfGetCssClassNameForEachDataRow(pClientRowId) {
      const arFromClientTbl = allClientTbls[this.propFormDef.id].find(pClientRowId)
      if (arFromClientTbl && arFromClientTbl.vnRowStateInSession === 24) {
        // New -> Changed
        return 'unsaved-data'
      }
      return ''
    },
    async mfDeleteRowInEditLayerientSideTable(pClientRowId) {
      await allClientTbls[this.propFormDef.id].delete(pClientRowId)
      this.mfManageFocus()
    },
    mfOnResetForm(formName) {
      allClientTbls[this.propFormDef.id].fnDeleteNewRowsInEditState()
    },
    async mfOnReviewed() {
      /*
        Goal: If i submitted 4 records with a empty record at once. We need to run submit process on those records which is not empty.
        The computed function 'cfGetClientTblReadyToReviewedStateRows' returns all the newly added row which is not empty from allClientTbls[this.propFormDef.id] ie; 'vnRowStateInSession' = 24
      */
      const arFromClientTbl = this.cfGetClientTblReadyToReviewedStateRows // calling cf instead of allClientTbls[this.propFormDef.id] since get benefit of caching.
      if (arFromClientTbl.length) {
        console.log('unsaved data found', arFromClientTbl)
        for (let i = 0; i < arFromClientTbl.length; i++) {
          if (arFromClientTbl[i].description.length < 3) {
            // Validation check
            await allClientTbls[this.propFormDef.id].update({
              where: (record) => record.clientSideUniqRowId === arFromClientTbl[i].clientSideUniqRowId,
              data: {
                validationClass: 'validaionErrorExist',
                vnRowStateInSession: '2456', // New -> Changed -> Requested save -> form error
                isValidationError: true,
              },
            })
          } else {
            await allClientTbls[this.propFormDef.id].update({
              where: (record) => record.clientSideUniqRowId === arFromClientTbl[i].clientSideUniqRowId,
              data: {
                validationClass: '',
                vnRowStateInSession: '2457', // New -> Changed -> Requested save -> Send to server
                isValidationError: false,
              },
            })
          }
        }
      }
      // if there are no records left then I need to add a empty. For goal read docs/forms.md/1.3
      await allClientTbls[this.propFormDef.id].fnSendToServer()
    },
  },
}
</script>

<style>
.unsaved-data textarea {
  border-color: #e6a23c;
}
.validaionErrorExist .el-textarea__inner {
  border-color: #ff4949;
}
</style>
