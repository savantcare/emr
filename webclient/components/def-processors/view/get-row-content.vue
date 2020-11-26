<template>
  <div
    id="container-for-1-data-row"
    @mouseover="mOver()"
    @mouseleave="mLeave()"
    :style="
      _formDef.styleForEachRowInPaperView
        ? _formDef.styleForEachRowInPaperView
        : 'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 1rem'
    "
  >
    <span v-for="(propFieldDef, id) in _formDef.fieldsDef" :key="id">
      <div :id="id" v-if="propFieldDef.fieldType === 'heading' && propFieldDef.showFieldLabel">
        <!-- Each field type gets to control how it prints the field name -->
        <h3>{{ propFieldDef.fieldNameInUi }}</h3>
      </div>

      <div :id="id" v-else-if="propFieldDef.fieldType === 'button' && propFieldDef.showFieldLabel">
        <!-- Each field type gets to control how it prints the field name -->
        <el-button size="mini" type="primary" round>{{ propFieldDef.fieldNameInUi }}</el-button>
      </div>

      <!-- There may be many different types of fields. Here dealing with select type field -->
      <div v-else-if="propFieldDef.fieldNameInDb.includes('select')">
        <!-- Each field type gets to control how it prints the field name -->
        <div v-if="propFieldDef.showFieldLabel">
          <h3>{{ propFieldDef.fieldNameInUi }}</h3>
        </div>
        <!-- Since it is select there will be many options hence need to do a for loop on options -->
        <!-- Since it is View layer I should only show the selected options and not all the options -->
        <div
          v-for="item in _formDef.fnGetAllSelectOptionsAndSelectedForAField(
            propFieldDef.fieldNameInDb,
            _entityRow.clientSideUniqRowId
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
      <!-- Slider field type -->
      <div v-else-if="propFieldDef.fieldType.includes('slider')" id="field-type-slider">
        <div v-if="_entityRow[propFieldDef.fieldNameInDb] > 0">
          <div v-if="propFieldDef.showFieldLabel" id="field-name-in-ui">
            <h4>{{ propFieldDef.fieldNameInUi }}</h4>
          </div>
          <div id="field-value-in-db">
            <div v-if="_entityRow[propFieldDef.fieldNameInDb] == 1">Not present</div>
            <div v-else-if="_entityRow[propFieldDef.fieldNameInDb] == 2">Sub-Syndromal</div>
            <div v-else-if="_entityRow[propFieldDef.fieldNameInDb] == 3">Syndromal</div>
            <div v-else>
              {{ _entityRow[propFieldDef.fieldNameInDb] }}
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="propFieldDef.fieldType.includes('number')" id="field-type-number">
        <div v-if="propFieldDef.showFieldLabel" id="field-name-in-ui">{{ propFieldDef.fieldNameInUi }}</div>
        <div id="field-value-in-db">
          {{ _entityRow[propFieldDef.fieldNameInDb] }} {{ propFieldDef.unitOfMeasurement }}
        </div>
      </div>

      <div v-else-if="propFieldDef.fieldType.includes('date')" id="field-type-date">
        <div v-if="propFieldDef.showFieldLabel" id="field-name-in-ui">{{ propFieldDef.fieldNameInUi }}</div>
        <div id="field-value-in-db">{{ _entityRow[propFieldDef.fieldNameInDb] | moment }}</div>
      </div>

      <!-- Not specified field type -->
      <span v-else id="not-matched-field-type">
        <div v-if="propFieldDef.showFieldLabel" id="field-name-in-ui" style="color: #909399">
          {{ propFieldDef.fieldNameInUi }}
        </div>
        <!-- Goal: skip fields that are null or empty -->
        <div v-if="_entityRow[propFieldDef.fieldNameInDb]" id="field-value-in-db">
          {{ _entityRow[propFieldDef.fieldNameInDb] }}
        </div>
      </span>
    </span>
    <div v-show="mouseOnThisRow" id="row-actions-when-appt-is-unlocked" v-if="_ApptStatus === 'unlocked'">
      <!-- Case 2/2: When this appt is un-locked what row actions to show-->

      <!-- Additional row actions example -> Take screen. The additional rows actions are defined in the formDef -->
      <span v-for="(additionalRowAction, id) in _formDef.additionalRowActions" :key="id">
        <el-button @click="additionalRowAction.executeThisFn(_entityRow)">{{ additionalRowAction.textInUi }}</el-button>
      </span>

      <el-tooltip class="item" effect="light" content="Click to edit" placement="top-start" :open-delay="500">
        <!--
                    Why @click has a condition
                    Goal: If this row is not coming from DB but it was added on the client then:
                  1. For edit I do not want to create a copy. I want to edit the row that has been added.
                  Why?
                  A copied row when undone expect to be left with orginal
                  But a new row when undone does not expect to be left with original.

                  In case of new row created on client during edit do not create a copy.
                  -->

        <!-- 
            why we have added right 60px?
            -- We have three icons there. If we add 'position - absolute' for all the three icons than icons coming on top of each other.
            In this case, we need to add icon position from right. I have maintain 20px space between each icons.

            See following diagram:

            edit  info  delete       |
              |     |      |__20px___|
              |     |                |
              |     |______40px______|
              |                      |
              |_________60px_________|


            -->

        <!--
        <el-button
          style="padding: 3px; color: #c0c4cc; border: none; position: absolute; right: 60px"
          plain
          @click="
            String(_entityRow.vnRowStateInSession).startsWith(2) && _entityRow.vnRowStateInSession !== 24751
              ? mfOpenAddInEditLayer()
              : mxOpenEditCtInEditLayer(_entityRow.clientSideUniqRowId)
          "
          class="el-icon-edit"
        >
        </el-button>
                -->
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="info" placement="top-end" :open-delay="500">
        <el-button
          style="padding: 3px; color: #c0c4cc; border: none; position: absolute; right: 40px"
          plain
          class="el-icon-discover"
        >
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="Click to delete" placement="top-end" :open-delay="500">
        <el-button
          style="padding: 3px; color: #c0c4cc; border: none; position: absolute; right: 20px"
          plain
          @click="mfIconDeleteClickedOnChildCard(_entityRow.clientSideUniqRowId)"
          class="el-icon-circle-close"
        >
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { rowState } from '@/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'

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
    _entityRow: {
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
