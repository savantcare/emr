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
      <el-button
        v-if="this._formDef.showAllnormalButtonInForm" size="mini"
        round
        :type="normalDefaultBtn ? 'primary' : 'plain'"
        @click="mf_set_fld_normal_value(_formDef,cfGetClientTblNewRowsInEditState)"
        style="float:right"
      >All Normal</el-button>
      <div
        v-for="(ormRow, index) in cfGetClientTblNewRowsInEditState"
        :key="index"
        :id="`each-data-row-` + index + `-` + _formDef.id"
        :style="_formDef.ctrlPlacementOfEveryFieldsNameAndValueInAddForm"
        why1="This style has grid design like grid-template-columns: 1fr 1fr 1fr "
      >
        <!-- Start to process fields in the row -->

        <div
          v-for="(_fieldDef, id) in _formDef.fieldsDef"
          :key="id"
          :style="_fieldDef.style"
          v-if="_regexForFieldSubset ? _fieldDef.nameInDb.match(_regexForFieldSubset) : true"
        >
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

            <!-- AUTO COMPLETE  -->
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
                :filterTermHighlight-first-item="true"
                @select="mf_set_fld_value_using_cache($event.id, ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
              ></el-autocomplete>
            </div>

            <!-- MULTI SELECT WITH BUTTONS -->
            <div v-else-if="_fieldDef.type === 'multi-select-with-buttons'" id="div-containing-all-buttons">
              <div v-if="_fieldDef.showLabel" :style="_fieldDef.compactDisplay ? 'display: inline' : 'display: block'">
                <b><span v-html="filterTermHighlight(_fieldDef.nameInUi)"></span></b>
              </div>
              <div
                v-for="(item, optionIndex) in _formDef.fnGetAllSelectOptionsAndSelectedForAField(
                  _fieldDef.nameInDb,
                  ormRow.clientSideUniqRowId
                )"
                :key="item.id"
                id="div-containing-one-button"
                :style="_fieldDef.compactDisplay ? 'display: inline' : 'display: block'"
              >
                <span
                  v-if="
                    !searchFilter ||
                    item.value.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    mf_matched_field_name(_fieldDef.nameInUi)
                  "
                  why1="Reasons for mf_matched_field_name -> If the field name matches then show all the options below that field"
                  :id="_fieldDef.nameInDb + optionIndex"
                >
                  <span
                    style="display:none"
                  >{{ allFieldValue[item.id] = [item.id,ormRow.clientSideUniqRowId,_fieldDef.nameInDb]}}</span>
                  <el-button
                    size="mini"
                    round
                    v-model="value[_fieldDef.nameInDb]"
                    :type="item.selected ? 'primary' : 'plain'"
                    @click="
                      mf_set_fld_value_using_cache(item.id, ormRow.clientSideUniqRowId, _fieldDef.nameInDb)
                      mf_store_id_of_field_which_has_focus_in_this_form(_fieldDef.nameInDb + optionIndex, index)
                    "
                    ><span v-html="filterTermHighlight(item.value)"></span
                  ></el-button>
                  <span v-if="item.subText"><br />({{ item.subText }})</span>
                </span>
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

            <div v-else-if="_fieldDef.type === 'vertical-slider'">
              <div>
                <vue-slider
                  class="slider"
                  v-model="value[_fieldDef.nameInDb]"
                  v-bind="_formDef.sliderOptions"
                  @change="mf_set_fld_value_using_cache($event, ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
                >
                </vue-slider>
                <div style="text-align: center">
                  {{ _fieldDef.nameInUi }}
                </div>
              </div>
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
            <!--
              Q) Why we add :id attribute in the below div and remove from el-input-number or el-input?
              --
                Problem: Unable to set id attribute of el-input to link with for attribute in el-form-item
                Ref: https://github.com/ElemeFE/element/issues/7622

                Solution: I have added :id attribute in parent div and in javascript use like - 'div#parent_div_id input'
              -->
            <div v-if="_fieldDef.type.includes('number')" :id="_fieldDef.nameInDb">
              <div v-if="_fieldDef.showLabel">
                {{ _fieldDef.nameInUi }}
              </div>
              <el-input-number
                @focus="mf_store_id_of_field_which_has_focus_in_this_form(_fieldDef.nameInDb, index)"
                :ref="_fieldDef.nameInDb"
                :class="mf_get_css_class_name_for_each_data_row(ormRow.clientSideUniqRowId)"
                :value="mf_get_fld_value(ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
                @input="
                  mf_set_fld_value_using_cache($event, ormRow.clientSideUniqRowId, _fieldDef.nameInDb, _fieldDef.type)
                "
              ></el-input-number>
              {{ _fieldDef.unitOfMeasurement }}
            </div>

            <!-- tribute-input/textarea -->
            <div v-if="_fieldDef.type.includes('tribute-input')" :id="_fieldDef.nameInDb">
              <div v-if="_fieldDef.showLabel">
                {{ _fieldDef.nameInUi }}
              </div>
              <!--
                According to github docs ref: https://github.com/syropian/vue-tribute there is no any option 
                to use el-input. Hence, I am using simple input box for vue-tribute.
                I am assigning a class 'el-input__inner' for same design as el-input.
                -->
              <vue-tribute
                :options="(_fieldDef.tributeOptions) ? _fieldDef.tributeOptions : doTributeOptions"
              >
                <input
                  @focus="mf_store_id_of_field_which_has_focus_in_this_form(_fieldDef.nameInDb, index)"
                  :ref="_fieldDef.nameInDb"
                  type="text"
                  class="el-input__inner"
                  :class="mf_get_css_class_name_for_each_data_row(ormRow.clientSideUniqRowId)"
                  :placeholder="_fieldDef.nameInUi"
                  :value="mf_get_fld_value(ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
                  @input="mf_set_fld_value_using_cache($event, ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
                />
              </vue-tribute>
            </div>

            <!-- tribute-textarea -->
            <div v-if="_fieldDef.type.includes('tribute-editor')" :id="_fieldDef.nameInDb">
              <div v-if="_fieldDef.showLabel">
                {{ _fieldDef.nameInUi }}
              </div>
              <!--
                According to github docs ref: https://github.com/syropian/vue-tribute there is no any option 
                to use el-input. Hence, I am using simple textarea for vue-tribute.
                I am assigning a class 'el-textarea__inner' for same design as el-input.
                -->
              <vue-tribute :options="doTributeOptions">
                <textarea
                  @focus="mf_store_id_of_field_which_has_focus_in_this_form(_fieldDef.nameInDb, index)"
                  :ref="_fieldDef.nameInDb"
                  type="text"
                  class="el-textarea__inner"
                  :class="mf_get_css_class_name_for_each_data_row(ormRow.clientSideUniqRowId)"
                  :placeholder="_fieldDef.nameInUi"
                  :value="mf_get_fld_value(ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
                  @input="
                    mf_set_fld_value_using_cache($event, ormRow.clientSideUniqRowId, _fieldDef.nameInDb)
                    mf_auto_resize_textarea($event)
                  "
                ></textarea>
              </vue-tribute>
            </div>

            <!-- input/textarea -->
            <div v-if="_fieldDef.type.includes('text')" :id="_fieldDef.nameInDb">
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
        <!-- Just ended processing one row -->
        <!-- goal: show divider only between rows and not at the end of the last row -->
        <div v-if="index == cfGetClientTblNewRowsInEditState.length - 1" style="grid-column: 1 / -1"></div>
        <div v-else><el-divider /></div>
        <!-- End of the divider placement logic -->
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
  </div>
</template>
<script>
import allPatientDataTbls from '@/components/non-temporal/form-manager/all-client-tables.js'
import allFormDefs from '@/components/non-temporal/form-manager/all-form-definations.js'
import { required, minLength, between } from 'vuelidate/lib/validators'
import { rowState } from '@/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'
import allMergedValues from '@/components/non-temporal/tribute/all-merged-values.js'
import VueTribute from 'vue-tribute'

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
    return {
      value: [],
      defaultNormalArray: this._formDef.defaultNormalArray,
      defaultNormalArrayMd: this._formDef.defaultNormalArrayMd,
      clickedDataArray:[],
      searchFilter: null,
      normalDefaultBtn : false,
      allFieldValue: [],
      doTributeOptions: {
        autocompleteMode: true,
        values: allMergedValues,
        positionMenu: true,
        menuContainer: document.querySelector('.menu-container'),
        noMatchTemplate: '',
      },
    }
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
    _regexForFieldSubset: {
      type: String,
    },
  },
  components: {
    VueTribute,
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
    mf_auto_resize_textarea(event) {
      /**
       * Ref: https://medium.com/@adamorlowskipoland/vue-auto-resize-textarea-3-different-approaches-8bbda5d074ce
       */
      event.target.style.height = 'auto'
      event.target.style.height = `${event.target.scrollHeight + 5}px`
    },
    filterTermHighlight(pText) {
      // https://stackoverflow.com/questions/8644428/how-to-filterTermHighlight-text-using-javascript
      if (this.searchFilter) {
        const hilit = pText.replace(
          new RegExp(this.searchFilter + '(?!([^<]+)?<)', 'gi'),
          '<b style="background-color:#ff0;font-size:100%">$&</b>'
        )
        return hilit
      }
      return pText
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
        var parentDivQuerySelector =
          '#each-data-row-' +
          pArFieldDetails['index'] +
          '-' +
          pArFieldDetails['formDefId'] +
          ' #' +
          pArFieldDetails['fieldNameInDb']

        var focusableElement = document.querySelectorAll(
          parentDivQuerySelector +
            ' button, ' +
            parentDivQuerySelector +
            ' input, ' +
            parentDivQuerySelector +
            ' select, ' +
            parentDivQuerySelector +
            ' textarea'
        )

        if (focusableElement[0]) {
          focusableElement[0].focus()
        }
      } else {
        if (pTabName == 'vitals') {
          /**
           * Exceptional case:
           * In the case of 'vitals', activeTabName and element name is different.
           * The activeTabName is vitals and multiple components like weight, height, etc. are included in this tab.
           * Hence, if we click vitals tab first time after page load then first input field of first component(weight) will be focused.
           */
          document.querySelector('#each-data-row-0-weight input:first-child').focus()
        } else {
          /**
           * I have get all the elements using querySelectorAll() and a comma-separated list of elements to target.
           * I want to look for buttons, input, textarea and select.
           * This returns a node list from which we can grab the first element as needed.
           */
          var focusableElement = document.querySelectorAll(
            '#each-data-row-0-' +
              pTabName +
              ' button, #each-data-row-0-' +
              pTabName +
              ' input, #each-data-row-0-' +
              pTabName +
              ' select, #each-data-row-0-' +
              pTabName +
              ' textarea'
          )
          if (focusableElement[0]) {
            focusableElement[0].focus()
          }
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
    mf_set_fld_value_using_cache(pEvent, pClientRowId, pFldName, pFldType) {
      // Ref: https://vuelidate.js.org/#sub-basic-form see "Withiut v-model"
      //console.log()
      let rowStatus = 0

      /**
       * Why we need to check pEvent is object?
       * -- In some cases like vue-tribute it returns a object otherwise returns as string.
       */
      if (pEvent instanceof Object) {
        pEvent = pEvent.target.value
      }
      // if (!pEvent) return // I have removed this line of code because if pEvent comes blank then
      // we need to update field value as blank in ORM.
      if (pFldType === 'number') {
        if (pEvent && pEvent > 0) {
          rowStatus = rowState.New_Changed_FormValidationPass // This implies valid is true
        } else {
          rowStatus = rowState.New_Changed_FormValidationFail // This implies invalid is true
        }
      } else {
        if (pEvent && pEvent.length > 2) {
          rowStatus = rowState.New_Changed_FormValidationPass // This implies valid is true
        } else {
          rowStatus = rowState.New_Changed_FormValidationFail // This implies invalid is true
        }
      }
      // TODO: rowStatus has to be dynamic deoending on if the form is valid or not at this time
      console.log("single row",pEvent, pClientRowId, pFldName, rowStatus);
      allPatientDataTbls[this._formDef.id].fnSetValueOfFld(pEvent, pClientRowId, pFldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/def-processors/manage-rows-of-table-in-client-side-orm.js:133/fnPutFldValueInCache
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
    mf_set_fld_normal_value(item,cfGetClientTblNewRowsInEditState){
      if(this.normalDefaultBtn){
        this.normalDefaultBtn = false
      } else {
        this.normalDefaultBtn = true
      }
      
      for(let row in this.clickedDataArray){
        allPatientDataTbls[this._formDef.id].fnSetValueOfFld(this.allFieldValue[this.clickedDataArray[row]][0],this.allFieldValue[this.clickedDataArray[row]][1],this.allFieldValue[this.clickedDataArray[row]][2],rowState.New_Changed_FormValidationPass)      
      }

      for(let row in this.defaultNormalArrayMd){
        for(let nestedRow in this.defaultNormalArrayMd[row]){
          console.log("md ",row, this.defaultNormalArrayMd[row][nestedRow],this.allFieldValue[this.defaultNormalArrayMd[row][nestedRow]][1]);
          
          allPatientDataTbls[this._formDef.id].fnSetValueOfFld(this.defaultNormalArrayMd[row][nestedRow],this.allFieldValue[this.defaultNormalArrayMd[row][nestedRow]][1],row,rowState.New_Changed_FormValidationPass)
        }
      }

    }
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

/** 
  CSS for tribute popup that comes when typing
 */
.tribute-container {
  top: 0;
  left: 0;
  height: auto;
  max-height: 300px;
  max-width: 500px;
  overflow: auto;
  display: block;
  z-index: 999999;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.13);
}
.tribute-container ul {
  margin: 0;
  margin-top: 2px;
  padding: 0;
  list-style: none;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.13);
  background-clip: padding-box;
  overflow: hidden;
}
.tribute-container li {
  color: #3f5efb;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
}
.tribute-container li.highlight,
.tribute-container li:hover {
  background: #3f5efb;
  color: #fff;
}
.tribute-container li span {
  font-weight: bold;
}
.tribute-container li.no-match {
  cursor: default;
}

/** 
  For Vitals tab only:
  We need to align measurement value, note and date in one row.
  Hence, I am adding the following css 
  1. Height of textarea (note field) and height input (measurement value and date) should be same. 
  2. Maintain a margin of 10px between each row
  3. Reduce input number field width as 140px due to space issue
*/
.el-tab-pane#pane-vitals textarea.el-textarea__inner {
  height: 40px !important;
  min-height: 40px !important;
}
.el-tab-pane#pane-vitals > div {
  display: block;
  overflow: hidden;
  margin-bottom: 10px;
}
.el-tab-pane#pane-vitals .el-input-number {
  width: 140px;
}
</style>
