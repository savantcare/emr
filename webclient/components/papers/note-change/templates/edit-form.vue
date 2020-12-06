<!-- Reference implementation for Mr1f (Multiple row 1 field) -->
<template>
  <div>
    <div v-if="_formDef.showFilterBySearchInAddForm">
      <el-input placeholder="Filter .." v-model="searchFilter" />
    </div>
    <div :style="_formDef.ctrlPlacementOfEveryFieldsNameAndValueInAddForm">
      <!-- Start to process fields in the row -->
      <div v-for="(_fieldDef, id) in _formDef.fieldsDef" :key="id" :style="_fieldDef.style">
        <!-- Start to process each field -->
        <div>
          <!-- HEADING -->
          <div v-if="_fieldDef.type === 'heading'">
            <div v-if="_fieldDef.showLabel">
              <h3>{{ _fieldDef.nameInUi }}</h3>
            </div>
          </div>

          <!--  AUTO COMPLETE  -->
          <div v-else-if="_fieldDef.type === 'autocomplete'">
            <div v-if="_fieldDef.showLabel">
              {{ _fieldDef.nameInUi }}
            </div>

            <el-autocomplete
              v-model="searchKeyword"
              class="inline-input"
              :fetch-suggestions="_fieldDef.selectOptions"
              :placeholder="_fieldDef.nameInUi"
              style="width: 100%"
              :highlight-first-item="true"
              @select="mfSetFldValueUsingCache($event.id, ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
            ></el-autocomplete>
          </div>

          <!-- MULTI SELECT WITH BUTTONS -->
          <div v-else-if="_fieldDef.type === 'multi-select-with-buttons'" id="div-containing-all-buttons">
            <div v-if="_fieldDef.showLabel" :style="_fieldDef.compactDisplay ? 'display: inline' : 'display: block'">
              <b><span v-html="filterTermHighlight(_fieldDef.nameInUi)"></span></b>
            </div>
            <div
              v-for="item in _formDef.fnGetAllSelectOptionsAndSelectedForAField(
                _fieldDef.nameInDb,
                dnClientIdOfCopiedRowBeingChanged
              )"
              :key="item.id"
              id="div-containing-one-button"
              :style="_fieldDef.compactDisplay ? 'display: inline' : 'display: block'"
            >
              <el-button
                size="mini"
                round
                :type="item.selected ? 'primary' : 'plain'"
                @click="mfSetCopiedRowBeingChangedFldVal(item.id, _fieldDef.nameInDb)"
                >{{ item.value }}</el-button
              >
              <span v-if="item.subText"><br />({{ item.subText }})</span>
            </div>
          </div>

          <!-- SELECT-->
          <el-select
            v-else-if="_fieldDef.type === 'select'"
            v-model="value"
            filterable
            :placeholder="_fieldDef.nameInUi"
          >
            <el-option
              v-for="item in _fieldDef.selectOptions"
              :key="item.value"
              :label="item.label"
              :value="mfGetFldValue(ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
              @input="mfSetFldValueUsingCache($event, ormRow.clientSideUniqRowId, _fieldDef.nameInDb)"
            >
            </el-option>
          </el-select>

          <!-- DATE -->
          <el-date-picker
            v-else-if="_fieldDef.type === 'date'"
            :ref="_fieldDef.nameInDb"
            format="MMM dd yyyy"
            value-format="timestamp"
            type="date"
            style="width: 100%"
            :value="mfGetCopiedRowBeingChangedFldVal(_fieldDef.nameInDb)"
            @input="mfSetCopiedRowBeingChangedFldVal($event, _fieldDef.nameInDb)"
            :placeholder="_fieldDef.nameInUi"
          >
          </el-date-picker>
          <!-- NUMBER -->
          <div v-if="_fieldDef.type.includes('number')" :id="_fieldDef.nameInDb">
            <div v-if="_fieldDef.showLabel">
              {{ _fieldDef.nameInUi }}
            </div>
            <el-input-number
              :ref="_fieldDef.nameInDb"
              :value="mfGetCopiedRowBeingChangedFldVal(_fieldDef.nameInDb)"
              @input="mfSetCopiedRowBeingChangedFldVal($event, _fieldDef.nameInDb)"
              @focus="nameInDbOfCurrentFieldInFocus = _fieldDef.nameInDb"
            ></el-input-number>
            {{ _fieldDef.unitOfMeasurement }}
          </div>

          <!-- input/textarea -->
          <div v-if="_fieldDef.type.includes('text')" :id="_fieldDef.nameInDb">
            <div v-if="_fieldDef.showLabel">
              {{ _fieldDef.nameInUi }}
            </div>

            <el-input
              :ref="_fieldDef.nameInDb"
              :type="_fieldDef.type"
              :autosize="{ minRows: 2, maxNumberOfRows: 4 }"
              :value="mfGetCopiedRowBeingChangedFldVal(_fieldDef.nameInDb)"
              @input="mfSetCopiedRowBeingChangedFldVal($event, _fieldDef.nameInDb)"
              @keydown.enter.native="mfForTabActionByEnter"
              @focus="nameInDbOfCurrentFieldInFocus = _fieldDef.nameInDb"
            ></el-input>
          </div>
        </div>

        <!-- Goal: Show history of this row. Since this is a single field hence we are showing the history. If it was multiple fields then we do not show the history -->
        <br />
        <el-timeline
          v-show="_fieldDef.showHistory === 'always' || nameInDbOfCurrentFieldInFocus === _fieldDef.nameInDb"
          style="padding-inline-start: 20px"
        >
          <el-timeline-item
            v-for="row in mfTimeLineDataAr(_fieldDef.nameInDb)"
            :key="row.ROW_START"
            :timestamp="row.ROW_START | moment"
            :type="row.type"
          >
            {{ row[_fieldDef.nameInDb] }}
            <!-- The following come on right of the description that comes in the timeline. 
        Since they are part of the same line we do not capitalize the first alphabet. So it is "sending to server"
        and it is not "Sending to server"
        -->
            <span v-if="row.vnRowStateInSession == 345" class="api-response-message el-button--warning"
              >sending to server</span
            >
            <span v-if="row.vnRowStateInSession == 34571" class="api-response-message el-button--success"
              >saved this session</span
            >
          </el-timeline-item>
        </el-timeline>
      </div>
      <el-button
        v-if="_formDef.showReviewedButtonInForm === true"
        type="primary"
        size="mini"
        plain
        @click="sfSendCopyChangedRowsToServer"
        >Reviewed</el-button
      >
    </div>
  </div>
</template>
<script>
import allPatientDataTbls from '@/components/non-temporal/form-manager/all-client-tables.js'
import { rowState } from '@/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'

import moment from 'moment'

export default {
  /*
    Q) Why is firstProp needed?
        There are many reminders when a reminder is to be changed there needs to be a way to find out which reminder
        the user wants to change.
        So firstProp is the remId being changed. The remId is the primary key coming from vuexOrm

    Q) Why is this called firstProp?
        This Ct is called in a for loop. In the same for loop other Ct are also called.
        So the prop name has to be generic and cannot be unique to each Ct

    Q) Why is firstprop not needed in 1r type Cts?
        Since we definitely know which row is being edited. I do not need to get a incoming ID.
        In 1r Cts the change form can be invoked directly. But for Mr change can only be invoked by clicking on an
        action button in the view layer. Since when action button in VL is clicked i get the ormID of that row

    Q) Why we are using 'formType' props?
        This change component has a method named 'mfSetFormFieldFocus' and it is focusing a form field.
        Change component is also being used in multi change component. Over there this component is being iterated several times within a slider.
        The problem is 'mfSetFormFieldFocus' method is also being called for each iteration and putting its own logic of focusing several times. This is causing the slider to now work.
        To prevent this malformation we are using 'formType' prop, passing 'embedded' string from multichange component and within 'mfSetFormFieldFocus' method we are bypassing the entire
        logic if formType value is set to 'embedded'.

    Q) What are the diff possible values for formtype?
              1. stand-alone -> it has its own controls
              2. embedded -> that means it has its own submit and other controls. But the same page has other forms also
              3. sub-part-of-another-form -> Data input will be allowed but no action buttons like submit or reset
    */

  props: {
    firstProp: {
      type: Number,
    },
    formType: {
      type: String,
    },
    _formDef: {
      type: Object,
      required: true,
      validator: function (obj) {
        // id is used to get the correct table from allClientTables
        if (obj.id) {
          // fieldsdef defines the fields that are shown in the form to edit
          if (obj.fieldsDef) {
            if (Object.keys(allPatientDataTbls).includes(obj.id)) {
              return true
            }
          }
        }

        return false
      },
    },
  }, // firstProp is the ClientIdOfRowToChange

  data() {
    return {
      dnOrmUuidOfRowToChange: '',
      dnClientIdOfRowToChange: this.firstProp, // why not use this.firstProp everywhere? When submit is success this needs to get updated. Not advised to update prop inside Ct. Ref: https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow
      dnClientIdOfCopiedRowBeingChanged: -1,
      nameInDbOfCurrentFieldInFocus: false,
      searchFilter: null,
      /* Convention: -1 implies that the system is not ready to have a value. This happens when the DB is still getting loaded.
        null implies that system is ready for pClientIdOfCopiedRowBeingChangedNVal to have a value but does not have a value */
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm a')
    },
  },
  computed: {},

  watch: {
    firstProp: {
      immediate: true,
      handler(pNVal, pOVal) {
        // NVal => New value and OVal => Old Value. Not doing this in mounted since when click on C in 1st rem mounted gets called. When click on C in 2nd rem mounted does not get called.
        console.log(pNVal, pOVal)
        this.dnClientIdOfRowToChange = pNVal
        this.dnClientIdOfCopiedRowBeingChanged = null
      },
    },

    /* Goal: Create a copy of the row to be changed. If a copy is already there then find the id of the copied row.
    By the time this watchFn exits this.dnClientIdOfCopiedRowBeingChanged will have a valid value */
    dnClientIdOfCopiedRowBeingChanged: {
      immediate: true, // setting this calls this watch when the Ct is first initialized
      /*  In V1 getting id of copied row was part of mounted, that is sequential programming,
          In V2 getting id of copied row is part of watch, this is "act on state" programming.

          When called first time:
            pNVal = -1 since data section sets that value
            pOVal is undefined

          When called second time:
            pNVal = null since any other function that wants a new row being copied sets it to null
            pOVal is the old value of pNVal. Hence previous row that was being edited  */

      async handler(pNVal, pOVal) {
        // NVal => New value and OVal => Old Value
        if (this.dnClientIdOfRowToChange === -1) return // Firstprop has not copied itself to this.dnClientIdOfRowToChange. Look at data section.

        if (pNVal === null) {
          /* When called first time this.dnClientIdOfRowToChange is assigned in the data section
              When called 2nd time this.dnClientIdOfRowToChange is the previous row that just got saved. */
          const arOrmRowToChange = allPatientDataTbls[this._formDef.id].find(this.dnClientIdOfRowToChange)
          this.dnOrmUuidOfRowToChange = arOrmRowToChange.serverSideRowUuid
          const vnExistingChangeRowId = allPatientDataTbls[this._formDef.id].fnGetChangeRowIdInEditState(
            arOrmRowToChange.serverSideRowUuid
          ) // For a given UUID there can be only 1 row in edit state.
          if (vnExistingChangeRowId === false) {
            // Adding a new blank record. Since this is temporal DB. Why is row copied and then edited/changed? See line 176
            this.dnClientIdOfCopiedRowBeingChanged = await allPatientDataTbls[
              this._formDef.id
            ].fnCopyRowAndGetCopiedRowId(arOrmRowToChange.clientSideUniqRowId)
          } else {
            this.dnClientIdOfCopiedRowBeingChanged = vnExistingChangeRowId
          }
        }
      },
    },
  },
  methods: {
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
    mfTimeLineDataAr(pFieldNameInDb) {
      const timelineDataArray = []

      // TODO: timeline of UUID should be base class
      // Insight: to create timeline the uuid will be same but id will be different.
      const arFromClientTbl = allPatientDataTbls[this._formDef.id]
        .query()
        .where('serverSideRowUuid', this.dnOrmUuidOfRowToChange)
        .orderBy('ROW_START', 'desc')
        .get()

      console.log('Time line for uuid', this.dnOrmUuidOfRowToChange, arFromClientTbl)
      if (arFromClientTbl.length) {
        let rowInTimeLine = []
        for (let i = 1; i < arFromClientTbl.length; i++) {
          rowInTimeLine = {}

          // do not insert empty row
          if (arFromClientTbl[i][pFieldNameInDb]) {
            if (arFromClientTbl[i][pFieldNameInDb].length < 1) {
              continue
            }
          } else {
            continue
          }

          rowInTimeLine[pFieldNameInDb] = arFromClientTbl[i][pFieldNameInDb]
          if (
            arFromClientTbl[i].vnRowStateInSession === rowState.SameAsDB_Copy ||
            arFromClientTbl[i].vnRowStateInSession === rowState.SameAsDB_Copy_Changed ||
            arFromClientTbl[i].vnRowStateInSession === rowState.SameAsDB_Copy_Changed_RequestedSave_FormValidationFail
          ) {
            rowInTimeLine.type = 'warning' // row is being edited and is not on server
          } else {
            rowInTimeLine.type = ''
          }
          rowInTimeLine.ROW_START = arFromClientTbl[i].ROW_START
          rowInTimeLine.vnRowStateInSession = arFromClientTbl[i].vnRowStateInSession

          timelineDataArray.push(rowInTimeLine)
        }
      }
      return timelineDataArray
    },

    /* Why is the row copied and then edited/changed? We want to show the history of the data. If I edit/change the original data then I will not know what the original data to show below the edit/change form. */
    async mfCopyRowToOrm(pOrmRowToChange) {
      this.dnClientIdOfCopiedRowBeingChanged = await allPatientDataTbls[this._formDef.id].fnCopyRowAndGetCopiedRowId(
        pOrmRowToChange.clientSideUniqRowId
      )
    },
    mfSetFormFieldFocus() {
      // Ref: https://stackoverflow.com/questions/60291308/vue-js-this-refs-empty-due-to-v-if
      if (this.$refs.description && this.formType !== 'embedded') {
        const lastElement = this.$refs.description.length
        /* this "if" is needed since when there is only 1 element then description is not an array of objects.
         with a single form "description" is just an object. */
        if (!lastElement) {
          this.$refs.description.focus()
        } else {
          this.$refs.description[lastElement - 1].focus()
        }
      }
    },
    mfGetCopiedRowBeingChangedFldVal(pFldName) {
      /* When C is first clicked and the control comes here. This fn is called twice
         Why?
         It is a default browser behavior. Clicking on the <label> will trigger 2 clicks, one for <label> and one for <input>.
         Ref: https://stackoverflow.com/a/58724163

         This fn is fired once when the property is first defined with undefined value and then is fired twice when a value is assigned to it.

        Q) When to get from ORM and when from cache?
         Inside get desc. 1st time it comes from ORM from then on it always come from cache. The cache value is set by mfSetCopiedRowBeingChangedFldVal */
      // From this point on the state is same for change and add
      return allPatientDataTbls[this._formDef.id].fnGetFldValue(this.dnClientIdOfCopiedRowBeingChanged, pFldName)
    },
    mfSetCopiedRowBeingChangedFldVal(pEvent, pFldName) {
      // TODO: need to do form validation here just like in add form
      const rowStatus = rowState.SameAsDB_Copy_Changed_FormValidationPass
      allPatientDataTbls[this._formDef.id].fnSetValueOfFld(
        pEvent,
        this.dnClientIdOfCopiedRowBeingChanged,
        pFldName,
        rowStatus
      )
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/def-processors/manage-rows-of-table-in-client-side-orm.js:133/fnPutFldValueInCache
    },
    mfForTabActionByEnter: function (e) {
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
  },
}
</script>

<style>
span.api-response-message {
  padding: 0px 8px 3px 8px;
  border-radius: 20px;
  font-size: 0.75rem;
}
</style>
