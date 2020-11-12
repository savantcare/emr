<template>
  <div>
    <!-- Section 1/2: This is a single row with 2 columns. The 1st col is the Heading and 2nd col are the buttons -->
    <el-row type="flex" justify="left" class="header3 sectionHeader" style="padding: 0rem; margin: 0rem">
      <!-- First col of the header. This has the Section name -->
      <el-col :span="9" class="sectionHeading"
        >{{ _formDef.plural.charAt(0).toUpperCase() + _formDef.plural.slice(1) }}
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
                  cfGetArOfDataRows.length < _formDef.maxNumberOfTemporallyValidRows ||
                  !_formDef.maxNumberOfTemporallyValidRows
                "
                class="el-icon-circle-plus-outline"
                size="mini"
                @click="mfOpenAddInEditLayer"
                style="padding: 3px; color: #c0c4cc; border: none"
              ></el-button>
              <!-- Multi edit. v-if stops giving multiedit when there is only a single row. There has to be more then 1 row for multi edit to make sense -->
              <el-button
                v-if="cfGetArOfDataRows.length > 1"
                class="el-icon-money"
                size="mini"
                @click="mfOpenMultiEditCtInEditLayer"
                style="padding: 3px; color: #c0c4cc; border: none"
              ></el-button>
            </span>
            <!-- Minimize or maximize. This appears if appt is locked or unlocked -->
            <el-button
              v-if="cfGetArOfDataRows.length > 0"
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

        <!-- This is to loop on fields. Since some rows may have 1 and other rows may have 4 fields 
         Using ternary operator for style since some components may not define _formDef.styleForEachRowInPaperView and for those Ct I want to use default value 
         Each appt gets a slide of its own
         -->

        <vue-horizontal-list
          :items="cfGetEntityValueDuringEachAppt"
          :options="options"
          :currentSlideNumber="currentSlideNumber"
          class="g2-container-for-all-timeline-boxes"
        >
          <template v-slot:default="{ item }">
            <div v-if="currentApptObj.apptStartMilliSecondsOnCalendar !== item.apptStartMilliSecondsOnCalendar">
              Appt on: {{ item.apptStartMilliSecondsOnCalendar | moment }}
            </div>
            <div
              class="item"
              id="each-row-of-entity-inside-appt"
              v-for="entityRow in item[_formDef.id]"
              :key="entityRow.clientSideUniqRowId"
            >
              <getRowContent
                :_entityRow="entityRow"
                :_formDef="_formDef"
                :_ApptStatus="item['apptStatus']"
                :_apptStartMilliSecondsOnCalendar="item['apptStartMilliSecondsOnCalendar']"
              />
              <!-- end of each-row-of-entity -->
              <!-- This is for action associated with each row -->
              <div v-if="currentApptObj['apptStatus'] === 'locked'" id="row-actions-when-app-is-locked"></div>
              <!-- Case 1/2: When this appt is locked what row actions to show-->
            </div>
            <!-- end of actions of each row -->
          </template>
        </vue-horizontal-list>
      </div>
      <div v-if="cfArOfAddendumForDisplay && cfArOfAddendumForDisplay.length > 0">
        <h4>Addendum:</h4>
        <div v-for="entityRow in cfArOfAddendumForDisplay" :key="entityRow.clientSideUniqRowId">
          <div style="margin: 5px 0">
            {{ entityRow.description }}
            <br />
            <span style="font-size: 0.625rem">Added by {{ entityRow.addedBy }} at {{ entityRow.ROW_START | moment }}</span>
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
import VueHorizontalList from '@/components/external/vue-horizontal-list.vue'
import getRowContent from './get-row-content.vue'

export default {
  data() {
    return {
      currentApptObj: {},
      amendmentData: '',
      isAddendumPopoverVisible: false,
      OnAndOffSwitchToShowContent: true,
      currentSlideNumber: 0,
      options: {
        responsive: [
          { end: 576, size: 1 },
          { start: 576, end: 768, size: 1 },
          { start: 768, end: 992, size: 1 },
          { size: 1 },
        ],
        list: {
          // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
          windowed: 900,

          // Because: #app {padding: 80px 24px;}
          padding: 4,
        },
        item: {
          padding: 4,
        },
      },
      items: [],
    }
  },
  components: { VueHorizontalList, getRowContent },
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
        if (secondaryDuringComparisonDataRows.length > this.cfGetArOfDataRows.length) {
          return 'border:1px solid #E6A23C'
        } else if (secondaryDuringComparisonDataRows.length < this.cfGetArOfDataRows.length) {
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
          if (secondaryDuringComparisonDataRows.length > this.cfGetArOfDataRows.length) {
            return 'border:1px solid #E6A23C'
          } else if (secondaryDuringComparisonDataRows.length < this.cfGetArOfDataRows.length) {
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
    cfGetEntityValueDuringEachAppt() {
      const arOfAppts = clientTblOfAppointments.query().get()
      let i = arOfAppts.length
      while (i--) {
        // remove those entries where its empty
        const rows = this.mfGetArOfDataRows(arOfAppts[i])
        //debugger
        if (rows.length > 0) {
          arOfAppts[i][this._formDef.id] = rows
        } else {
          arOfAppts.splice(i, 1)
        }
      }
      for (let j = 0; j < arOfAppts.length; j++) {
        if (arOfAppts[j].clientSideUniqRowId === this._apptId) {
          this.currentSlideNumber = j
        }
      }

      return arOfAppts
    },

    cfGetArOfDataRows() {
      const pApptObj = this.currentApptObj
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
        /* for locked appts*/
        arOfObjectsFromClientDB = allClientTbls[this._formDef.id]
          .query()
          .where('ROW_END', (value) => value > pApptObj['ROW_END']) // Row was locked after the appt was locked. hence row was valid during the appt
          .where('ROW_START', (value) => value < pApptObj['ROW_END']) // Row was created before the appt was locked.
          .get()
      }
      return arOfObjectsFromClientDB
    },
  },
  methods: {
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
        /* for locked appts*/
        arOfObjectsFromClientDB = allClientTbls[this._formDef.id]
          .query()
          .where('ROW_END', (value) => value > pApptObj['ROW_END']) // Row was locked after the appt was locked. hence row was valid during the appt
          .where('ROW_START', (value) => value < pApptObj['ROW_END']) // Row was created before the appt was locked.
          .get()
      }
      return arOfObjectsFromClientDB
    },
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
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
}
.sectionHeading {
  font-size: 1rem;
  color: #606266;
}
.subSectionHeader {
  margin-top: 1rem !important;
  padding-bottom: 0.1rem !important;
}

.field-type-heading {
  grid-column-start: 1;
}

/* ref: 
Design being used
https://github.com/fuxingloh/vue-horizontal-list

Designs not being used:
http://jsfiddle.net/rnwa4fv5/
https://stackoverflow.com/questions/41522938/scrolling-on-x-axis-in-a-div-with-overflow 
http://jsfiddle.net/kf1y2npw/30/
*/

.g2-container-for-all-timeline-boxes {
  /* Same as #app at https://github.com/fuxingloh/vue-horizontal-list */
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 4px 4px;
}

.g3-each-box-in-timeline {
  display: inline-block; /* Does not add a line break */
  padding: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: grey;
}
</style>
