<template>
  <div
    id="container-for-1-data-row"
    :style="
      _formDef.ctrlPlacementOfEveryFieldsNameAndValueInViewNote
        ? _formDef.ctrlPlacementOfEveryFieldsNameAndValueInViewNote
        : 'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 1rem'
    "
  >
    <div
      @mouseover="mOver()"
      @mouseleave="mLeave()"
      v-for="(_fieldDef, id) in _formDef.fieldsDef"
      :key="id"
      id="start-processing-each-field-of-row"
      v-if="_dataRow[_fieldDef.nameInDb]"
      why="skippling empty fields here since if I loop a empty div the display:grid inserts a empty div. Also more performant."
    >
      <!-- Goal: There are many different types of fields. Using v-if to identify the type of field and then taking action. -->

      <!-- HEADING -->
      <div v-if="_fieldDef.type === 'heading' && _fieldDef.showLabel" :id="id">
        <!-- Each field type gets to control how it prints the field name -->
        <h3>{{ _fieldDef.nameInUi }}</h3>
      </div>

      <!-- BUTTON -->
      <div v-else-if="_fieldDef.type === 'button' && _fieldDef.showLabel" :id="id">
        <!-- Each field type gets to control how it prints the field name -->
        <el-button size="mini" type="primary" round>{{ _fieldDef.nameInUi }}</el-button>
      </div>

      <!-- SELECT -->
      <div v-else-if="_fieldDef.nameInDb.includes('select')">
        <!-- Each field type gets to control how it prints the field name -->
        <div v-if="_fieldDef.showLabel">
          <b>{{ _fieldDef.nameInUi }}</b>
        </div>
        <!-- Since it is select there will be many options hence need to do a for loop on options -->
        <!-- Since it is View layer I should only show the selected options and not all the options -->
        <div
          v-for="item in _formDef.fnGetAllSelectOptionsAndSelectedForAField(
            _fieldDef.nameInDb,
            _dataRow.clientSideUniqRowId
          )"
          :key="item.id"
          v-if="item.selected"
        >
          <!-- this v-if is part of this div and not <div id="selected-option">
                  reason: So that empty divs are not generated.
                  If <div id="selected-option" v-if="item.selected">
                    then a empty divs for each of the select options will get generated.
                  -->

          <!-- Goal: Only show the selected option -->
          <div id="selected-option">
            {{ item.value }}
          </div>
        </div>
      </div>

      <!-- SLIDER -->
      <div v-else-if="_fieldDef.type.includes('slider')" id="field-type-slider">
        <div v-if="_dataRow[_fieldDef.nameInDb] > 0">
          <div v-if="_fieldDef.showLabel" id="field-name-in-ui">
            <h4>{{ _fieldDef.nameInUi }}</h4>
          </div>
          <div id="field-value-in-db">
            <div v-if="_dataRow[_fieldDef.nameInDb] == 1">Not present</div>
            <div v-else-if="_dataRow[_fieldDef.nameInDb] == 2">Sub-Syndromal</div>
            <div v-else-if="_dataRow[_fieldDef.nameInDb] == 3">Syndromal</div>
            <div v-else>
              {{ _dataRow[_fieldDef.nameInDb] }}
            </div>
          </div>
        </div>
      </div>

      <!-- NUMBER -->
      <div v-else-if="_fieldDef.type.includes('number')" id="field-type-number">
        <div v-if="_fieldDef.showLabel" id="field-name-in-ui" style="display: inline">{{ _fieldDef.nameInUi }}</div>
        <div id="field-value-in-db">{{ _dataRow[_fieldDef.nameInDb] }} {{ _fieldDef.unitOfMeasurement }}</div>
      </div>

      <div v-else-if="_fieldDef.type.includes('date')" id="field-type-date">
        <div v-if="_fieldDef.showLabel" id="field-name-in-ui">{{ _fieldDef.nameInUi }}</div>
        <div id="field-value-in-db">{{ _dataRow[_fieldDef.nameInDb] | moment }}</div>
      </div>

      <!-- INPUT / TEXT AREA -->
      <div v-else-if="_fieldDef.type.includes('text')" id="field-value-in-db" style="display: inline">
        <span v-if="_fieldDef.showLabel" id="not-matched-field-type-field-name-in-ui" style="color: #909399">
          {{ _fieldDef.nameInUi }}:
        </span>
        {{ _dataRow[_fieldDef.nameInDb] }}
      </div>
      <!-- Additional row actions example -> Take screen. The additional rows actions are defined in the formDef -->
      <span v-for="(additionalRowAction, id) in _formDef.additionalRowActions" :key="id">
        <el-button @click="additionalRowAction.executeThisFn(_dataRow)">{{ additionalRowAction.textInUi }}</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import { rowState } from '@/components/non-temporal/form-manager/crud/manage-rows-of-table-in-client-side-orm.js'

// Library
import moment from 'moment'

export default {
  data() {
    return {
      mouseOnThisRow: false,
    }
  },
  components: {},
  props: {
    _formDef: {
      type: Object,
      required: true,
    },
    _dataRow: {
      type: Object,
      required: true,
    },
    _ApptStatus: {
      required: true,
    },
    _apptStartMilliSecsOnCalendar: {
      required: true,
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    },
  },
  methods: {
    mOver(pRowId) {
      console.log(this._ApptStatus)
      setTimeout(() => {
        this.mouseOnThisRow = true
      }, 500)
    },
    mLeave(pRowId) {
      setTimeout(() => {
        this.mouseOnThisRow = false
      }, 500)
    },
    mfOpenAddInEditLayer() {
      const term = 'add ' + this._formDef.id
      console.log(term)
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: term,
      })
    },
    mxOpenEditCtInEditLayer(pClientDataRowId) {
      /*
       We need rowID of vuexORM inside the change ct. Since change ct needs the exiting Desc of the reminber to change
       Option 1: Send the whole data row
       Option 2: Send just the ID in a prop.
        +ves:
          1. At some places I may need to call change where I have the reminder ID but
          i do not have the remainder of the data row. Hence this makes the Change Ct possible
          to use at other places
          2. When I send a paramter it is like calling a function. Sending the whole data row
          is like working on a gloal variable. So other Cts can also modify this global variable.
      */
      const payload = { searchTerm: 'edit ' + this._formDef.id, pPropsToGiveToCt: pClientDataRowId }
      console.log(payload)
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', payload)
    },
    mfGetCssClassNameForEachDataRow(pRow) {
      /* The color conventions are:
      Case 1: black: Data created during that appt.
      Case 2: orange: form validatoion has failed
      Case 3: green: some edits have been made and it pases form validation 
      Case 4: blue: This is carry forward
      */

      let string = ''

      if (
        pRow.vnRowStateInSession.toString().endsWith(rowState.SameAsDB) &&
        pRow.ROW_START < this._apptStartMilliSecsOnCalendar
      ) {
        return 'color: #409EFF' // Blue as per https://element.eleme.io/#/en-US/component/color
      } else if (
        pRow.vnRowStateInSession.toString().endsWith(rowState.SameAsDB) ||
        pRow.vnRowStateInSession.toString().endsWith(rowState.Copy)
      ) {
        return '' // Blue as per https://element.eleme.io/#/en-US/component/color
      } else if (pRow.vnRowStateInSession.toString().endsWith(rowState.FormValidationFail)) {
        string = 'color: #E6A23C;' // this is hex code for orange
      } else if (pRow.vnRowStateInSession.toString().endsWith(rowState.FormValidationPass)) {
        string = 'color: #67c23a;' // this is hex code for green
      }
      return string
    },
  },
}
</script>
<style scoped></style>
