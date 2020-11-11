<template>
  <div style="background-color: rgba(64, 158, 255, 0.1)">
    <!-- Section 1/2: This is a single row with 2 columns. The 1st col is the Heading and 2nd col are the buttons -->
    <el-row type="flex" justify="left" class="header3 sectionHeader" style="padding: 0rem; margin: 0rem">
      <!-- First col of the header. This has the Section name -->
      <el-col :span="9" class="sectionHeading"
        >History of {{ _formDef.plural.charAt(0).toUpperCase() + _formDef.plural.slice(1) }}
        <i v-show="arrowDirection < -1" class="el-icon-arrow-left" style="color: blue"></i>
        <i v-show="arrowDirection > 1" class="el-icon-arrow-right" style="color: blue"></i>
      </el-col>
      <!-- 2nd col of the header. This has the header action buttons -->
      <el-col :span="12"
        ><div class="grid-content">
          <!-- Case 1/2: When this appt is locked. This decides what header action buttons to show when the appt is locked -->
          <el-button-group style="float: left; display: none">
            <span v-if="currentApptObj['apptStatus'] === 'locked'">
              <el-popover placement="right" width="400" v-model="isAddendumPopoverVisible">
                <div style="text-align: right; margin: 0">
                  <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
                  <!-- Amendment icon -->
                  <el-button
                    v-if="amendmentData.length > 0"
                    type="success"
                    icon="el-icon-check"
                    style="position: absolute; bottom: 15px; right: 15px"
                    size="mini"
                    @click="mfSaveAddendum(amendmentData, _formDef.id)"
                    circle
                  ></el-button>
                </div>
                <el-button
                  slot="reference"
                  class="el-icon-edit-outline"
                  size="mini"
                  style="padding: 3px; color: #c0c4cc; border: none"
                />
              </el-popover>
            </span>
            <!-- Case 2/2: When this appt is un-locked. This decides what header action buttons to show when the appt is not locked -->
            <span v-else>
              <!-- Add. v-if makes sure that for Ct like chief complaint it will not display add if greater then 0 rows. !_formDef.maxNumberOfTemporallyValidRows makes sure that is a ct has not defined max Rows then the add button comes. -->
              <el-button
                v-if="
                  mfGetArOfDataRows(this.currentApptObj).length < _formDef.maxNumberOfTemporallyValidRows ||
                  !_formDef.maxNumberOfTemporallyValidRows
                "
                class="el-icon-circle-plus-outline"
                size="mini"
                @click="mfOpenAddInEditLayer"
                style="padding: 3px; color: #c0c4cc; border: none"
              ></el-button>
              <!-- Multi edit. v-if stops giving multiedit when there is only a single row. There has to be more then 1 row for multi edit to make sense -->
              <el-button
                v-if="mfGetArOfDataRows(this.currentApptObj).length > 1"
                class="el-icon-money"
                size="mini"
                @click="mfOpenMultiEditCtInEditLayer"
                style="padding: 3px; color: #c0c4cc; border: none"
              ></el-button>
            </span>
            <!-- Minimize or maximize. This appears if appt is locked or unlocked -->
            <el-button
              v-if="mfGetArOfDataRows(this.currentApptObj).length > 0"
              :class="OnAndOffSwitchToShowContent ? 'el-icon-remove-outline' : 'el-icon-full-screen'"
              size="mini"
              @click="OnAndOffSwitchToShowContent = !OnAndOffSwitchToShowContent"
              style="padding: 3px; color: #c0c4cc; border: none"
            ></el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>
    <!-- Section 2/2: This starts after the header ends -->
    <div :style="cfGetDataRowStyle">
      <!-- Goal: Only do this if this section has not been minimized -->
      <div v-if="OnAndOffSwitchToShowContent">
        <!-- This is for each data row -->
        <!-- Design: 

        Goal 1: Each data row is made into a grid with 3 columns
          How? display: grid; grid-template-columns: 1fr 1fr 1fr
        
        Goal 2: Between columns there is some space
          How? style="grid-column-gap: 1rem
        
        Goal 3: If 1st and 2nd field has no value then 3rd field should be in 1st col and not in 3rd col
          Solution 1:
          How? grid-template-columns: min-content 1fr;
          With 1fr you're telling the second col to consume any and all free space available in the row. Hence, when there is no content in the .first element, the .second element takes the space.
          Ref: https://stackoverflow.com/a/50709699

          Solution 2:
          div for id="each-field-of-data-row" has a if statement. So this div does not get generated if this field does not have content.
          v-if="row[propFieldDef.fieldNameInDb].toString().length > 0"


        Goal 4: Each time a heading type field comes go to the next row   (Not working)
          Ref: https://stackoverflow.com/a/47077596

        Goal 5: Each row should have a gap of 1 rem
          How? grid-row-gap: 1rem;              //not working
        -->

        <!-- Using ternary operator for style since some components may not define _formDef.styleForEachRowInPaperView and for those Ct I want to use default value -->
        <div
          id="each-data-row"
          v-for="row in mfGetArOfDataRows(this.currentApptObj)"
          :key="row.clientSideUniqRowId"
          :style="
            _formDef.styleForEachRowInPaperView
              ? _formDef.styleForEachRowInPaperView
              : 'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 1rem'
          "
        >
          <!-- This is to loop on fields. Since some rows may have 1 and other rows may have 4 fields -->

          <div
            id="each-field-of-data-row"
            :class="'field-type-' + propFieldDef.fieldType"
            v-for="(propFieldDef, id) in _formDef.fieldsDef"
            :key="id"
            :style="mfGetCssClassNameForEachDataRow(row)"
            v-if="row[propFieldDef.fieldNameInDb] && row[propFieldDef.fieldNameInDb].toString().length > 0"
          >
            <!-- 
              Explanation of v-if statement
              Goal: Skip any empty fields in the row 
              row[propFieldDef.fieldNameInDb] can either be integer or string
              For e.g. for recs it is string and for psych review of systems it is number

              Goal: Skip fields that are null
              For e.g. notes in weight will be null if never set.
              The first condition in && is evaluated first.
              So first I evaluate row[propFieldDef.fieldNameInDb] to make sure it is not null
              Then i evaluate row[propFieldDef.fieldNameInDb].toString().length
              If I evaluate the 2nd param first it will give error in console when row[propFieldDef.fieldNameInDb] is null
              -->

            <div :id="id" v-if="propFieldDef.fieldType === 'heading' && propFieldDef.showFieldLabel">
              <!-- the field printing is not common for all field types so that heading can be applied -->
              <h3>{{ propFieldDef.fieldNameInUi }}</h3>
            </div>

            <div :id="id" v-else-if="propFieldDef.fieldType === 'button' && propFieldDef.showFieldLabel">
              <!-- the field printing is not common for all field types so that heading can be applied -->
              <el-button size="mini" type="primary" round>{{ propFieldDef.fieldNameInUi }}</el-button>
            </div>

            <!-- There may be many different types of fields. Here dealing with select type field -->
            <div v-else-if="propFieldDef.fieldNameInDb.includes('select')">
              <!-- Each fieldtype gets to control its own way of showing the field label -->
              <div v-if="propFieldDef.showFieldLabel">
                <h3>{{ propFieldDef.fieldNameInUi }}</h3>
              </div>
              <!-- Since it is select there will be many options hence need to do a for loop on options -->
              <!-- Since it is View layer I should only show the selected options and not all the options -->
              <div
                v-for="item in _formDef.fnGetAllSelectOptionsAndSelectedForAField(
                  propFieldDef.fieldNameInDb,
                  row.clientSideUniqRowId
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
              <div v-if="row[propFieldDef.fieldNameInDb] > 0">
                <div v-if="propFieldDef.showFieldLabel" id="field-name-in-ui">
                  <h4>{{ propFieldDef.fieldNameInUi }}</h4>
                </div>
                <div id="field-value-in-db">
                  <div v-if="row[propFieldDef.fieldNameInDb] == 1">Not present</div>
                  <div v-else-if="row[propFieldDef.fieldNameInDb] == 2">Sub-Syndromal</div>
                  <div v-else-if="row[propFieldDef.fieldNameInDb] == 3">Syndromal</div>
                  <div v-else>
                    {{ row[propFieldDef.fieldNameInDb] }}
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="propFieldDef.fieldType.includes('number')" id="field-type-number">
              <div v-if="propFieldDef.showFieldLabel" id="field-name-in-ui">{{ propFieldDef.fieldNameInUi }}</div>
              <div id="field-value-in-db">
                {{ row[propFieldDef.fieldNameInDb] }} {{ propFieldDef.unitOfMeasurement }}
              </div>
            </div>

            <div v-else-if="propFieldDef.fieldType.includes('date')" id="field-type-date">
              <div v-if="propFieldDef.showFieldLabel" id="field-name-in-ui">{{ propFieldDef.fieldNameInUi }}</div>
              <div id="field-value-in-db">{{ row[propFieldDef.fieldNameInDb] | moment }}</div>
            </div>

            <!-- Not specified field type -->
            <div v-else id="not-matched-field-type">
              <div v-if="propFieldDef.showFieldLabel" id="field-name-in-ui">{{ propFieldDef.fieldNameInUi }}</div>
              <!-- Goal: skip fields that are null or empty -->
              <div v-if="row[propFieldDef.fieldNameInDb]" id="field-value-in-db">
                {{ row[propFieldDef.fieldNameInDb] }}
              </div>
            </div>
          </div>
          <!-- Finished processing all the fields -->
          <!-- This is for action associated with each row -->
          <div v-if="currentApptObj['apptStatus'] === 'locked'" id="row-actions-when-app-is-locked"></div>
          <!-- Case 1/2: When this appt is locked what row actions to show-->
          <div v-else id="row-actions-when-app-is-unlocked">
            <!-- Case 2/2: When this appt is un-locked what row actions to show-->
            <div>
              <!-- Additional row actions example -> Take screen. The additional rows actions are defined in the formDef -->
              <el-button-group style="float: right">
                <div v-for="(additionalRowAction, id) in _formDef.additionalRowActions" :key="id">
                  <el-button @click="additionalRowAction.executeThisFn(row)">{{
                    additionalRowAction.textInUi
                  }}</el-button>
                </div>

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
                  <el-button
                    style="padding: 3px; color: #c0c4cc; border: none"
                    plain
                    @click="
                      String(row.vnRowStateInSession).startsWith(2) && row.vnRowStateInSession !== 24751
                        ? mfOpenAddInEditLayer()
                        : mxOpenEditCtInEditLayer(row.clientSideUniqRowId)
                    "
                    class="el-icon-edit"
                  >
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="info" placement="top-end" :open-delay="500">
                  <el-button style="padding: 3px; color: #c0c4cc; border: none" plain class="el-icon-discover">
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="Click to delete" placement="top-end" :open-delay="500">
                  <el-button
                    style="padding: 3px; color: #c0c4cc; border: none"
                    plain
                    @click="mfIconDeleteClickedOnChildCard(row.clientSideUniqRowId)"
                    class="el-icon-circle-close"
                  >
                  </el-button>
                </el-tooltip>
              </el-button-group>
            </div>
          </div>
        </div>
      </div>
      <div v-if="cfArOfAddendumForDisplay && cfArOfAddendumForDisplay.length > 0">
        <h4>Addendum:</h4>
        <div v-for="row in cfArOfAddendumForDisplay" :key="row.clientSideUniqRowId">
          <div style="margin: 5px 0">
            {{ row.description }}
            <br />
            <span style="font-size: 10px">Added by {{ row.addedBy }} at {{ row.ROW_START | moment }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientTblOfAddendums from '~/components/temporal/amendment/db/client-side/structure/amendment-client-side-table.js'
import clientTblOfAppointments from '@/components/temporal/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'

import clInvokeMixin from '@/components//def-processors/view/cl-invoke-mixin.js'

import moment from 'moment'

import allClientTbls from '@/components/def-processors/all-client-tables.js'
import { rowState } from '@/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'

export default {
  data() {
    return {
      currentApptObj: {},
      amendmentData: '',
      isAddendumPopoverVisible: false,
      OnAndOffSwitchToShowContent: true,
    }
  },
  mixins: [clInvokeMixin],

  filters: {
    moment: function (date) {
      return moment(date).format("MMM Do 'YY, h:mm a")
    },
  },
  props: {
    _apptId: {
      type: Number,
      required: true,
    },
    _formDef: {
      type: Object,
      required: true,
    },
    arrowDirection: {
      type: Number,
    },
  },
  async mounted() {
    if (!this._apptId === 0) {
      return
    }
    this.currentApptObj = await clientTblOfAppointments.find(this._apptId)
  },
  computed: {
    cfGetDataRowStyle() {
      /* When I come to this fn the following scenarios are possible
        clientTblOfLeftSideViewCards(2) has 2 fields F1. firstParameterGivenToComponentBeforeMounting F2. secondParameterGivenToComponentBeforeMounting
        Possibilities are 1. Both have values 2. Only 1 has value.
        First goal: Find if _apptId is same as F1 or F2. If _apptId == F2 then it is comparison mode. If _apptId != F2 then for certain I can say _apptId == F1. _apptId may or many not be comparison mode.
        if there is value in F2 then _apptId is in comparison mode. If F2 is empty then this is single note render mode.
      */

      let secondaryDuringComparisonApptObj = {}
      let secondaryDuringComparisonDataRows = {}

      const printableApptNoteComponentCardObj = clientTblOfLeftSideViewCards.find(2)

      // Goal: Find if current ID matches with firstParam or secondParam. It has to match with one of those 2
      if (printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting'] === this._apptId) {
        // Handle the case when the current ID matches with the second param Need to compare with first
        secondaryDuringComparisonApptObj = clientTblOfAppointments.find(
          printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting']
        )
        secondaryDuringComparisonDataRows = this.mfGetArOfDataRows(secondaryDuringComparisonApptObj)
        if (secondaryDuringComparisonDataRows.length > this.mfGetArOfDataRows(this.currentApptObj).length) {
          return 'border:1px solid #E6A23C'
        } else if (secondaryDuringComparisonDataRows.length < this.mfGetArOfDataRows(this.currentApptObj).length) {
          return 'border:1px solid #67C23A'
        } else {
          // I come here when the length of both rows is same, Now there are 2 possibilities 1. Content is same 2. Content is different.
          return ''
        }
      } else {
        //
        // Case when this appt is not the 2nd param so it is the first param
        //

        // there may or may not be a second paramters. If no second parameter then there is no comparison to be made
        if (printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting']) {
          // Need to compare with second
          secondaryDuringComparisonApptObj = clientTblOfAppointments.find(
            printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting']
          )

          secondaryDuringComparisonDataRows = this.mfGetArOfDataRows(secondaryDuringComparisonApptObj)
          if (secondaryDuringComparisonDataRows.length > this.mfGetArOfDataRows(this.currentApptObj).length) {
            return 'border:1px solid #E6A23C'
          } else if (secondaryDuringComparisonDataRows.length < this.mfGetArOfDataRows(this.currentApptObj).length) {
            return 'border:1px solid #67C23A'
          } else {
            return
          }
        }
      }
      // Nothing to compare with
    },
    cfArOfAddendumForDisplay() {
      const arFromClientTblOfAddendums = clientTblOfAddendums
        .query()
        .where('appointmentId', this._apptId)
        .where('component', 'reminders')
        .orderBy('ROW_START', 'asc')
        .get()

      return arFromClientTblOfAddendums
    },
  },
  methods: {
    log(item) {
      console.log(item)
    },
    mfOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'multi edit reminders',
      })
    },
    mfOpenAddInEditLayer() {
      const term = 'add ' + this._formDef.id
      console.log(term)
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: term,
      })
    },
    mfSaveAddendum(pAddendumData, component) {
      clientTblOfAddendums.insert({
        data: {
          appointmentId: this.currentApptObj.clientSideUniqRowId,
          component: component,
          description: pAddendumData,
          ROW_START: Math.floor(Date.now()),
        },
      })

      // remove modal value after save
      this.amendmentData = ''
    },
    mfGetArOfDataRows(pApptObj) {
      const emptyArray = []

      if (!pApptObj) {
        // returning empty array and not null. Since others deprend on the length of the array. If I return null there will be errors when length of that is calculated.
        return emptyArray
      }
      if (!pApptObj['apptStatus']) {
        return emptyArray
      }

      let arOfObjectsFromClientDB = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientDB = allClientTbls[this._formDef.id].fnGetPresentUniqueUuidNotEmptyRows(
          this._formDef.atLeastOneOfFieldsForCheckingIfRowIsEmpty
        )
      } else {
        arOfObjectsFromClientDB = allClientTbls[this._formDef.id]
          .query()
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientDB
    },
    mfGetCssClassNameForEachDataRow(pRow) {
      /* The color conventions are:
      Case 1: black: same as DB or it is a copy but no change has been done
      Case 2: orange: form validatoion has failed
      Case 3: green: some edits have been made and it pases form validation */

      if (
        pRow.vnRowStateInSession.toString().endsWith(rowState.SameAsDB) ||
        pRow.vnRowStateInSession.toString().endsWith(rowState.Copy)
      ) {
        // Case 1
        return
      } else if (pRow.vnRowStateInSession.toString().endsWith(rowState.FormValidationFail)) {
        // case 2
        return 'color: #E6A23C;' // this is hex code for orange
      }

      // Case 3
      return 'color: #67c23a;' // this is hex code for green
    },
    cfApptLockDateInHumanReadableFormat() {
      return moment(this.patientCurrentApptObj['ROW_END']).format('MMM DD YYYY HH:mm') // parse integer
    },
  },
}
</script>

<style scoped>
.header3:hover .el-button-group {
  display: inline-block !important;
  position: absolute; /* This makes sure there is no jumping when mouse is taken over the icon */
}

h3 {
  border-bottom: 1px solid #dcdfe6;
  margin-top: 1rem;
  width: 100%;
  float: none;
  display: flex;
}
.sectionHeader {
  margin-top: 1rem !important;
  padding-bottom: 0.1rem !important;
  border-bottom: 1px solid rgba(144, 147, 153, 0.1);
}
.sectionHeading {
  font-size: 1rem;
  color: #606266;
}
.subSectionHeader {
  margin-top: 1rem !important;
  padding-bottom: 0.1rem !important;
  border-bottom: 1px solid #dcdfe6;
}

.field-type-heading {
  grid-column-start: 1;
}
</style>
