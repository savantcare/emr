<!-- Goal: Show multiple add rows along with remove each row. At end A. Reviewed B. Reset form C. Add more  -->
<template>
  <div>
    <div v-if="_formDef.showFilterBySearchInAddForm">
      <el-input placeholder="Filter .." v-model="searchFilter" />
    </div>
    <!-- Start rendering the add form Start to process each row -->
    <div
      v-if="cfGetClientTblNewRowsInEditState.length && cfEmptyRowAtBottom"
      why1="Find existing rows in edit state. If there no such rows inside v-else creates a empty row "
      why2="cfEmptyRowAtBottom creates a empty row at bottom is the new row has some data in it. This empty row at bottom allows faster entering of data"
    >
      <div
        v-for="(ormRow, index) in cfGetClientTblNewRowsInEditState"
        :key="index"
        :id="`each-data-row-` + index + `-` + _formDef.id"
        :style="_formDef.ctrlPlacementOfEveryFieldsNameAndValueInAddForm"
        why1="This has grid design like grid-template-columns: 1fr 1fr 1fr "
      >
        <!-- Start to process fields in the row -->
        <div v-for="(_fieldDef, id) in _formDef.fieldsDef" :key="id" :style="_fieldDef.style">
          <!-- Start to process each field -->
          <div>
            <!-- The following are the possible field types -->

            <!-- HEADING -->
            <div v-if="_fieldDef.type === 'heading'">
              <div v-if="_fieldDef.showLabel">
                <!-- the field printing happens lower so each field type can decide what format to apply -->
                <h3>{{ _fieldDef.nameInUi }}</h3>
              </div>
            </div>

            <!-- AUTO COMPLETE  
              fetch-suggestions="_fieldDef.selectOptions This is per field since if there are 3 fields each may implement their select options on thier own -->
            <div v-else-if="_fieldDef.type === 'autocomplete'">
              <div v-if="_fieldDef.showLabel">
                {{ _fieldDef.nameInUi }}
              </div>

              <el-autocomplete
                v-model="value[_fieldDef.nameInDb]"
                class="inline-input"
                :fetch-suggestions="_fieldDef.selectOptions"
                :placeholder="_fieldDef.nameInUi"
                style="width: 100%"
                :highlight-first-item="true"
                @select="mf_set_fld_value_using_cache($event.id, ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
              ></el-autocomplete>
            </div>

            <!-- multi-select-with-buttons -->
            <div v-else-if="_fieldDef.type === 'multi-select-with-buttons'">
              <div v-if="_fieldDef.showLabel">
                <b><span v-html="highlight(_fieldDef.nameInUi)"></span></b>
              </div>
              <div
                v-for="item in _formDef.fnGetAllSelectOptionsAndSelectedForAField(
                  _fieldDef.nameInDb,
                  ormRow.clientSideUniqRowId
                )"
                :key="item.id"
              >
                <div
                  v-if="
                    !searchFilter ||
                    item.value.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    mf_matched_field_name(_fieldDef.nameInUi)
                  "
                  why1="Reasons for mf_matched_field_name -> If the field name matches then show all the options below that field"
                >
                  <el-button
                    size="mini"
                    round
                    v-model="value[_fieldDef.nameInDb]"
                    :type="item.selected ? 'primary' : 'plain'"
                    @click="mf_set_fld_value_using_cache(item.id, ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
                    ><span v-html="highlight(item.value)"></span
                  ></el-button>
                  <span v-if="item.subText"><br />({{ item.subText }})</span>
                </div>
              </div>
            </div>

            <!-- SLIDER type field value[_fieldDef.nameInDb] -->
            <div v-else-if="_fieldDef.type === 'slider'">
              <div v-if="_fieldDef.showLabel">
                {{ _fieldDef.nameInUi }}
              </div>
              <div class="block">
                <el-slider
                  v-model="value[_fieldDef.nameInDb]"
                  :step="_fieldDef.fieldOptions.step"
                  show-stops
                  :min="_fieldDef.fieldOptions.min"
                  :max="_fieldDef.fieldOptions.max"
                  :marks="_fieldDef.marks"
                  :format-tooltip="_fieldDef.ft"
                  @change="mf_set_fld_value_using_cache($event, ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
                >
                </el-slider>
              </div>
            </div>

            <!-- SELECT -->
            <div v-else-if="_fieldDef.type === 'select'">
              <div v-if="_fieldDef.showLabel">
                {{ _fieldDef.nameInUi }}
              </div>
              <el-select v-model="value" filterable :placeholder="_fieldDef.nameInUi">
                <el-option
                  v-for="item in _fieldDef.selectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="mf_get_fld_value(ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
                  @input="mf_set_fld_value_using_cache($event, ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
                >
                </el-option>
              </el-select>
            </div>

            <!-- DATE -->
            <div v-if="_fieldDef.type === 'date'">
              <div v-if="_fieldDef.showLabel">
                {{ _fieldDef.nameInUi }}
              </div>

              <el-date-picker
                :ref="_fieldDef.nameInDb"
                format="MMM dd yyyy"
                value-format="timestamp"
                type="date"
                style="width: 100%"
                :class="mf_get_css_class_name_for_each_data_row(ormRow.clientSideUniqRowId)"
                :value="mf_get_fld_value(ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
                @input="mf_set_fld_value_using_cache($event, ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
                :placeholder="_fieldDef.nameInUi"
              >
              </el-date-picker>
            </div>

            <!-- NUMBER -->
            <div v-if="_fieldDef.type.includes('number')">
              <div v-if="_fieldDef.showLabel">
                {{ _fieldDef.nameInUi }}
              </div>
              <el-input-number
                @focus="mf_store_id_of_field_which_has_focus_in_this_form(_fieldDef.nameInDb, index)"
                :id="_fieldDef.nameInDb"
                :ref="_fieldDef.nameInDb"
                v-model="value[_fieldDef.nameInDb]"
                :class="mf_get_css_class_name_for_each_data_row(ormRow.clientSideUniqRowId)"
                :value="mf_get_fld_value(ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
                @input="mf_set_fld_value_using_cache($event, ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
              ></el-input-number>
              {{ _fieldDef.unitOfMeasurement }}
            </div>

            <!-- input/textarea -->
            <div v-if="_fieldDef.type.includes('text')">
              <div v-if="_fieldDef.showLabel">
                {{ _fieldDef.nameInUi }}
              </div>
              <!-- 
                Goal: When I switch tabs inside the change paper the form field focus needs to be maintained. Each tab contains a seperate component. 
                The Cts inside the tab are not remounted when the tavs are switched

                Form focus step: 1/9
                  On focus event call fn named 'mf_store_id_of_field_which_has_focus_in_this_form' to store current focus position
                -->
              <el-input
                @focus="mf_store_id_of_field_which_has_focus_in_this_form(_fieldDef.nameInDb, index)"
                :id="_fieldDef.nameInDb"
                :ref="_fieldDef.nameInDb"
                :type="_fieldDef.type"
                :class="mf_get_css_class_name_for_each_data_row(ormRow.clientSideUniqRowId)"
                :autosize="{ minRows: 2, maxNumberOfRows: 10 }"
                :placeholder="_fieldDef.nameInUi"
                :value="mf_get_fld_value(ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
                @input="mf_set_fld_value_using_cache($event, ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
                @keydown.enter.native="mf_for_tab_action_by_enter"
              ></el-input>
            </div>
          </div>

          <!-- Just ended processing all the fields in the row -->
        </div>

        <div>
          <!-- Goal: Show remove button on the RHS of each row.
               This will be the 1fr of the display grid 
               Remove should not come if there is only one _formDef.maxRow
               
               TODO Not clear: Why is there a v-if condition in el-button
               -->
          <el-button
            v-if="
              mf_get_ar_of_data_rows() < _formDef.maxNumberOfTemporallyValidRows ||
              !_formDef.maxNumberOfTemporallyValidRows
            "
            plain
            round
            size="mini"
            type="warning"
            @click="mfDeleteRowInClientSideTable(ormRow.clientSideUniqRowId)"
            >Remove</el-button
          >
        </div>
        <!-- Just ended processing each row -->
        <div style="grid-column: 1 / -1">
          <el-divider />
        </div>
      </div>
    </div>
    <!-- Scenario: There are no edit state rows. Then create a empty row for faster data input -->
    <div v-else>{{ mf_add_empty_row_in_client_side_table() }}</div>

    <!-- Form action buttons below the form -->
    <el-button v-if="_formDef.showReviewedButtonInForm === true" type="primary" plain @click="mfOnReviewed"
      >Reviewed</el-button
    >

    <!-- Add. v-if makes sure that for Ct like chief complaint it will not display add if greater then 0 rows. !_formDef.maxNumberOfTemporallyValidRows makes sure that is a ct has not defined max Rows then the add button comes. -->
    <el-button
      v-if="
        _formDef.showAddMoreButtonInForm !== false &&
        (mf_get_ar_of_data_rows() < _formDef.maxNumberOfTemporallyValidRows || !_formDef.maxNumberOfTemporallyValidRows)
      "
      type="primary"
      plain
      size="mini"
      round
      @click="mf_add_empty_row_in_client_side_table"
      >Add more</el-button
    >
    <el-button
      size="mini"
      round
      v-if="_formDef.showResetFormButton !== false"
      type="warning"
      plain
      @click="mf_on_reset_form"
      >Reset form</el-button
    >

    <!-- Goal: Show data at the time of sending to server -->
    <el-table
      v-if="cfGetClientTblApiSendingStateRows.length > 0"
      :data="cfGetClientTblApiSendingStateRows"
      style="width: 100%; background: #f0f9eb"
    >
      <el-table-column label="Sending to server">
        <div v-for="(_fieldDef, id) in _formDef.fieldsDef" :key="id">
          <el-table-column :prop="_fieldDef.nameInDb" :label="_fieldDef.nameInDb"></el-table-column>
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
        <div v-for="(_fieldDef, id) in _formDef.fieldsDef" :key="id">
          <el-table-column :prop="_fieldDef.nameInDb" :label="_fieldDef.nameInUi"></el-table-column>
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
        <div v-for="(_fieldDef, id) in _formDef.fieldsDef" :key="id">
          <el-table-column prop="_fieldDef.fieldNameUi" label="Attempted but failed to save"></el-table-column>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import allPatientDataTbls from '@/components/def-processors/all-client-tables.js'
import allFormDefs from '@/components/def-processors/all-form-definations.js'
import { required, minLength, between } from 'vuelidate/lib/validators'
import { rowState } from '@/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'

export default {
  created() {
    /* Goal: init the values when the form is mounted. For e.g. when a form is mounted I want all slider values to be init so slider can show the current state.
      When add form is mounted 1st time this will return a empty array
      2nd time onwards it will return an array of data that came from vuex-orm
      This was first used for slider form control.
  */
    this.value = this._formDef.fnCreated(this.mf_get_ar_of_data_rows())
  },
  data() {
    return { value: [], searchFilter: '' }
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
            if (Object.keys(allPatientDataTbls).includes(obj.id)) {
              return true
            }
          }
        }

        return false
      },
    },
  },
  computed: {
    // allPatientDataTbls[this._formDef.id] functions can not be directly called from template. hence computed functions have been defined.
    cfGetClientTblNewRowsInEditState() {
      const r = allPatientDataTbls[this._formDef.id].fnGetNewRowsInEditState() // for things like SS it will return 1 row. For things like reminders it will return 0 to many rows
      return r
    },
    cfEmptyRowAtBottom() {
      // Why? When entering reminders there should always be a empty row at bottom so reminbders can be added faster
      // Case 1: There can be infinite number of data rows
      if (!this._formDef || !this._formDef.maxNumberOfTemporallyValidRows) {
        const r = allPatientDataTbls[this._formDef.id].fnGetNewRows()
        if (r.length > 0) return true
      } else {
        // Case 2: There can only be limited number of data rows
        const currentRowCount = allPatientDataTbls[this._formDef.id].query().count() // Get number of rows. The number of rows has to be less then maxNumberOfTemporallyValidRows
        if (currentRowCount >= this._formDef.maxNumberOfTemporallyValidRows) {
          // Case 2A: Max number of data rows has been reached. So do not add a new row at bottom
          return true
        } else {
          // There are no new reows and max number of rows has not been reached. So return false and remaining system will add a row
          const r = allPatientDataTbls[this._formDef.id].fnGetNewRows()
          if (r.length === 0) return false
        }
      }
      return false
    },
    cfGetClientTblReadyToReviewedStateRows() {
      return allPatientDataTbls[this._formDef.id].fnGetNewRowsInFormValidationPassState()
    },
    cfGetClientTblApiSuccessStateRows() {
      return allPatientDataTbls[this._formDef.id].fnGetNewRowsInApiSuccessState()
    },
    cfGetClientTblApiErrorStateRows() {
      return allPatientDataTbls[this._formDef.id].fnGetNewRowsInApiErrorState()
    },
    cfGetClientTblApiSendingStateRows() {
      return allPatientDataTbls[this._formDef.id].fnGetNewRowsInApiSendingState()
    },
  },
  mounted() {
    /**
     * Form focus step: 8/9
     *  Receive tabName and array of previously saved focus position details from event listener and
     *  then call a method function named 'mf_restore_form_field_focus_on_tab_change' to restore focus position
     *
     * Doc should have explained the reason for needing setTimeOut @raj
     */
    const eventName = 'event-from-tab-change-to-focus-form-field'
    this.$root.$on(eventName, (pTabName, pArFieldDetails) => {
      setTimeout(() => this.mf_restore_form_field_focus_on_tab_change(pTabName, pArFieldDetails), 200)
    })
  },
  methods: {
    highlight(pText) {
      // https://stackoverflow.com/questions/8644428/how-to-highlight-text-using-javascript
      const hilit = pText.replace(
        new RegExp(this.searchFilter + '(?!([^<]+)?<)', 'gi'),
        '<b style="background-color:#ff0;font-size:100%">$&</b>'
      )
      //console.log(hilit)
      return hilit
    },
    log(item) {
      console.log(item)
    },
    mf_matched_field_name(pFieldName) {
      return pFieldName.toLowerCase().includes(this.searchFilter.toLowerCase())
    },

    mf_for_tab_action_by_enter: function (e) {
      /* In our application, enter key should act as tab for single line text field only, for textarea or multiple line text field, cursor should come to next line by pressing enter. Like textarea other html tags have default behaviour for enter.
          Ref: https://stackoverflow.com/questions/2523752/behavior-of-enter-key-in-textbox */

      //Finding cuurrent node and checking if it is textarea as this function is calling from same place for input and textarea, if it is textarea, we leave textarea to to do its own functionlity by pressing enter. otherwise for input enter ascts as tab.
      const currentNode = e.target
      if (currentNode.tagName != 'TEXTAREA') {
        //Isolate the node that we're after to put focus on that node.
        const inputs = Array.from(document.querySelectorAll('input[type="text"],textarea'))
        const index = inputs.indexOf(e.target)
        if (index < inputs.length) {
          inputs[index + 1].focus()
        }
      }
    },
    mf_restore_form_field_focus_on_tab_change(pTabName, pArFieldDetails) {
      /**
       * Form focus step: 9/9
       * In this function two types of scenario may happened:
       * i) We something do in this tab and then switch to another tab and again back to this tab
       *    -- this scenario we covered in if statement using previously stored tabName, form index and fieldNameInDb.
       * ii) We click this tab first time after page load
       *    -- this scenario we covered in else statement that first input field should be focused.
       */
      if (pArFieldDetails && pArFieldDetails['fieldNameInDb'] && pArFieldDetails['index'] > -1) {
        document
          .querySelector(
            '#each-data-row-' + pArFieldDetails['index'] + '-' + pTabName + ' #' + pArFieldDetails['fieldNameInDb']
          )
          .focus()
      } else {
        if (document.querySelector('#each-data-row-0-' + pTabName + ' input:first-child')) {
          document.querySelector('#each-data-row-0-' + pTabName + ' input:first-child').focus()
        } else {
          document.querySelector('#each-data-row-0-' + pTabName + ' textarea:first-child').focus()
        }
      }
    },
    mf_get_ar_of_data_rows() {
      const arOfObjectsFromClientDB = allPatientDataTbls[this._formDef.id]
        .query()
        .where('ROW_END', 2147483648000) // if unlocked then only current rows should be shown
        .where('vnRowStateInSession', (value) => value > 1) // 2 is new on client.
        .get()
      return arOfObjectsFromClientDB
    },

    async mf_add_empty_row_in_client_side_table() {
      // TODO: this should be part of base class

      if (!this._formDef || !this._formDef.maxNumberOfTemporallyValidRows) {
        // if maxNumberOfTemporallyValidRows has not been defined then go ahead and add an empty row
      } else {
        const currentRowCount = allPatientDataTbls[this._formDef.id].query().count() // Get number of rows. The number of rows has to be less then maxNumberOfTemporallyValidRows
        if (currentRowCount >= this._formDef.maxNumberOfTemporallyValidRows) {
          return
        }
      }

      const arFromClientTbl = await allPatientDataTbls[this._formDef.id].insert({
        data: {
          vnRowStateInSession: 2, // For meaning of diff values read webclient/cts/def-processors/crud/forms.md
          ROW_START: Math.floor(Date.now()), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
        },
      })
      if (!arFromClientTbl) {
        console.log('FATAL ERROR')
      }

      this.mf_set_form_field_focus()
    },
    mf_set_form_field_focus() {
      // Ref: https://stackoverflow.com/questions/60291308/vue-js-this-refs-empty-due-to-v-if
      const firstField = this._formDef.fieldsDef[0].nameInDb
      if (this.$refs[firstField]) {
        const lastElement = this.$refs[firstField].length
        // When rec is opened first time there is only 1 single row. So I want the focus to be on first row. When user starts to type in first row then a 2nd empty row gets inserted automatically but I want the focus to remain on first row.
        // When user starts to type in 2nd row then 3rd row gets inserted automatically. When user deletes the 2nd row I want the focus to be on 1st.
        if (!lastElement) return
        if (!this.$refs[firstField]) return
        console.log(firstField, lastElement, this.$refs[firstField])
        if (lastElement === 1) {
          if (this.$refs[firstField][lastElement - 1]) this.$refs[firstField][lastElement - 1].focus()
        }
        if (this.$refs[firstField][lastElement - 2]) this.$refs[firstField][lastElement - 2].focus()
      }
    },
    // Cannot call allPatientDataTbls[this._formDef.id] function directly from template so need to have a method function to act as a pipe between template and the ORM function
    mf_get_fld_value(pClientRowId, pFldName) {
      return allPatientDataTbls[this._formDef.id].fnGetFldValue(pClientRowId, pFldName)
    },
    mf_set_fld_value_using_cache(pEvent, pClientRowId, pFldName) {
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

      allPatientDataTbls[this._formDef.id].fnSetValueOfFld(pEvent, pClientRowId, pFldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/def-processors/crud/manage-rows-of-table-in-client-side-orm.js:133/fnPutFldValueInCache
    },
    mf_get_css_class_name_for_each_data_row(pClientRowId) {
      const arFromClientTbl = allPatientDataTbls[this._formDef.id].find(pClientRowId)
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
    async mfDeleteRowInClientSideTable(pClientRowId) {
      await allPatientDataTbls[this._formDef.id].delete(pClientRowId)
      this.mf_set_form_field_focus()
    },
    mf_on_reset_form(formName) {
      allPatientDataTbls[this._formDef.id].fnDeleteNewRowsInEditState()
    },
    mf_store_id_of_field_which_has_focus_in_this_form(pFieldNameInDb, pIndex) {
      /**
       * Form focus step: 2/9
       *  Send fieldNameInDb and form index (focus posiotion detail) to 'show-vertical-tabs-in-dialog.vue' page using event listener
       *
       * Q. Why we send focus position details to another page?
       * -- Because, our goal is that if we switch the tab and again back to the previous tab, we need to restore the focus position.
       *   Hence, we store the focus position in the 'show-vertical-tabs-in-dialog.vue' component.
       */
      const eventName = 'event-from-form-field-to-set-focus'
      this.$root.$emit(eventName, this._formDef.id, pFieldNameInDb, pIndex)
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
