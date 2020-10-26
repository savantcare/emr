<template>
  <div>
    <!-- This is a single row with 2 columns. The 1st col is the Heading and 2nd col are the buttons -->
    <el-row type="flex" justify="left" class="header3 sectionHeader" style="padding: 0rem; margin: 0rem">
      <!-- First col of the header. This has the Section name -->
      <el-col :span="9" class="sectionHeading">{{
        propCtDef.plural.charAt(0).toUpperCase() + propCtDef.plural.slice(1)
      }}</el-col>
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
                    @click="mfSaveAddendum(amendmentData, propCtDef.id)"
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
              <!-- Add. v-if makes sure that for Ct like chief complaint it will not display add if greater then 0 rows. !propCtDef.maxRows makes sure that is a ct has not defined max Rows then the add button comes. -->
              <el-button
                v-if="mfGetArOfDataRows(this.currentApptObj).length < propCtDef.maxRows || !propCtDef.maxRows"
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
    <!-- This starts after the header ends -->
    <div :style="cfGetDataRowStyle">
      <!-- Goal: Only do this if this section has not been minimized -->
      <div v-if="OnAndOffSwitchToShowContent">
        <!-- This is for each data row -->
        <table style="padding: 0px; margin: 0px">
          <tr v-for="row in mfGetArOfDataRows(this.currentApptObj)" :key="row.clientSideUniqRowId">
            <!-- This is to loop on fields. Since some rows may have 1 and other rows may have 4 fields -->
            <td v-for="(propFieldObj, id) in propCtDef.fields" :key="id" :style="mfGetCssClassNameForEachDataRow(row)">
              <div v-if="propFieldObj.fieldNameInDb.includes('select')">{{ propCtDef.fnGetSelectOptionLabel() }}</div>
              <div v-else>
                {{ row[propFieldObj.fieldNameInDb] }}
              </div>
            </td>
            <!-- This is for action assocaited with each row -->
            <div v-if="currentApptObj['apptStatus'] === 'locked'"></div>
            <!-- Case 1/2: When this appt is locked what row actions to show-->
            <div v-else>
              <!-- Case 2/2: When this appt is un-locked what row actions to show-->
              <td>
                <el-button-group style="float: right">
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="Click to edit"
                    placement="top-start"
                    :open-delay="500"
                  >
                    <el-button
                      style="padding: 3px; color: #c0c4cc; border: none"
                      plain
                      @click="mxOpenEditCtInEditLayer(row.clientSideUniqRowId)"
                      class="el-icon-edit"
                    >
                    </el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" content="info" placement="top-end" :open-delay="500">
                    <el-button style="padding: 3px; color: #c0c4cc; border: none" plain class="el-icon-discover">
                    </el-button>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="Click to delete"
                    placement="top-end"
                    :open-delay="500"
                  >
                    <el-button
                      style="padding: 3px; color: #c0c4cc; border: none"
                      plain
                      @click="mfIconDeleteClickedOnChildCard(row.clientSideUniqRowId)"
                      class="el-icon-circle-close"
                    >
                    </el-button>
                  </el-tooltip>
                </el-button-group>
              </td>
            </div>
          </tr>
        </table>
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

import allergiesClientTbl from '@/components/temporal/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import chiefComplaintClientTbl from '@/components/temporal/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'
import diagnosisClientTbl from '@/components/temporal/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'
import familyHistoryClientTbl from '@/components/temporal/family-history/db/client-side/structure/family-history-of-a-patient-table.js'
import miscNotesClientTbl from '@/components/temporal/miscellaneous-notes/db/client-side/structure/misc-notes-of-a-patient-table.js'
import planCommentsClientTbl from '@/components/temporal/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'
import processNotesClientTbl from '@/components/temporal/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'
import recommendationClientTbl from '@/components/temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'
import reminderClientTbl from '@/components/temporal/reminders/db/client-side/structure/reminders-of-a-patient-table.js'
import serviceStatementClientTbl from '@/components/temporal/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

import clInvokeMixin from '@/components/temporal/1-framework/view-layer/cl-invoke-mixin.js'

// defining all rows in this object
const clientTbl = {
  allergies: allergiesClientTbl,
  chief_complaint: chiefComplaintClientTbl,
  diagnosis: diagnosisClientTbl,
  family_history: familyHistoryClientTbl,
  miscellaneous_notes: miscNotesClientTbl,
  plan_comments: planCommentsClientTbl,
  process_notes: processNotesClientTbl,
  recommendations: recommendationClientTbl,
  reminders: reminderClientTbl,
  service_statements: serviceStatementClientTbl,
} // 1st row

import moment from 'moment'

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
      return moment(date).format('MMMM Do YYYY, h:mm a')
    },
  },
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
    propCtDef: {
      type: Object,
      required: true,
    },
  },
  async mounted() {
    if (!this.propApptId === 0) {
      return
    }
    this.currentApptObj = await clientTblOfAppointments.find(this.propApptId)
  },
  computed: {
    cfGetDataRowStyle() {
      let secondaryDuringComparisonApptObj = {}
      let secondaryDuringComparisonDataRows = {}

      const printableApptNoteComponentCardObj = clientTblOfLeftSideViewCards.find(2)

      // Goal: Find if current ID matches with firstParam or secondParam. It has to match with one of those 2
      if (printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting'] === this.propApptId) {
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
        .where('appointmentId', this.propApptId)
        .where('component', 'reminders')
        .orderBy('ROW_START', 'asc')
        .get()

      return arFromClientTblOfAddendums
    },
  },
  methods: {
    mfOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'multi edit reminders',
      })
    },
    mfOpenAddInEditLayer() {
      const term = 'add ' + this.propCtDef.id
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
      if (!pApptObj) return

      let arOfObjectsFromClientDB = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientDB = clientTbl[this.propCtDef.id]
          .query()
          .where('ROW_END', 2147483648000) // if unlocked then only current rows should be shown
          .where('vnRowStateInSession', (value) => value > 2) // 2 is new on client. Dont want 2 since it is still empty. When greater then 2 that means it is on client and changed.
          .get()
      } else {
        arOfObjectsFromClientDB = clientTbl[this.propCtDef.id]
          .query()
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientDB
    },
    mfGetCssClassNameForEachDataRow(pRow) {
      const strOfNumber = pRow.vnRowStateInSession.toString()
      const lastCharecter = strOfNumber.slice(-1)
      if (lastCharecter === '4' || lastCharecter === '6') {
        return 'color: #E6A23C;'
      } else {
        return 'color: #202020;'
      }
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
  border-bottom: 1px solid #dcdfe6;
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
</style>
