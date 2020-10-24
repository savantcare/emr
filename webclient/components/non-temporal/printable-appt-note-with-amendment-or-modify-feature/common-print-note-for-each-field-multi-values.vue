<template>
  <div>
    <!-- This is a single row with 2 columns. The 1st col is the Heading and 2nd col are the buttons -->
    <el-row type="flex" justify="left" class="remindersh3 sectionHeader" style="padding: 0rem; margin: 0rem">
      <!-- First col of the header. This has the Section name -->
      <el-col :span="9" class="sectionHeading">{{
        propReferToComponentInUiAtPluralClassification.charAt(0).toUpperCase() +
        propReferToComponentInUiAtPluralClassification.slice(1)
      }}</el-col>
      <!-- 2nd col of the header. This has the action buttons -->
      <el-col :span="12"
        ><div class="grid-content">
          <!-- Case 1/2: When this appt is locked -->
          <div v-if="currentApptObj['apptStatus'] === 'locked'">
            <el-popover placement="right" width="400" v-model="isAddendumPopoverVisible">
              <div style="text-align: right; margin: 0">
                <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
                <el-button
                  v-if="amendmentData.length > 0"
                  type="success"
                  icon="el-icon-check"
                  style="position: absolute; bottom: 15px; right: 15px"
                  size="mini"
                  @click="mfSaveAddendum(amendmentData, 'reminder')"
                  circle
                ></el-button>
              </div>
              <el-button
                slot="reference"
                class="el-icon-edit-outline"
                style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
              ></el-button>
            </el-popover>
          </div>
          <!-- Case 2/2: When this appt is un-locked -->
          <div v-else>
            <el-button-group style="float: left; display: none">
              <el-button
                class="el-icon-money"
                size="mini"
                @click="mfOpenMultiEditCtInEditLayer"
                style="padding: 3px; color: #c0c4cc; border: none"
              ></el-button>
              <el-button
                class="el-icon-circle-plus-outline"
                size="mini"
                @click="mfOpenAddInEditLayer"
                style="padding: 3px; color: #c0c4cc; border: none"
              ></el-button>
              <el-button
                class="el-icon-remove-outline"
                size="mini"
                @click="toggleSwitchShowBodyContent = !toggleSwitchShowBodyContent"
                style="padding: 3px; color: #c0c4cc; border: none"
              ></el-button>
            </el-button-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <div :style="cfGetReminderStyle">
      <div v-if="toggleSwitchShowBodyContent">
        <div v-for="row in mfGetArOfReminders(this.currentApptObj)" :key="row.clientSideUniqRowId">
          <span v-for="(propFieldObj, id) in propFormFields" :key="id">
            {{ row[propFieldObj.fieldName] }}
          </span>
        </div>
      </div>
      <br />
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
import clientSideTblOfAddendums from '~/components/1time-eachField-multiValues/amendment/db/client-side/structure/amendment-client-side-table.js'
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientSideTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'

import reminderClientSideTable from '@/components/1time-eachField-multiValues/reminders/db/client-side/structure/reminders-of-a-patient-table.js'
import recommendationClientSideTable from '@/components/1time-eachField-multiValues/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'
import miscNotesClientSideTable from '@/components/1time-eachField-multiValues/misc-notes/db/client-side/structure/misc-notes-of-a-patient-table.js'
import planCommentsClientSideTable from '@/components/1time-eachField-multiValues/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'
import processNotesClientSideTable from '@/components/1time-eachField-multiValues/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'
import familyHistoryClientSideTable from '@/components/1time-eachField-multiValues/family-history/db/client-side/structure/family-history-of-a-patient-table.js'
import allergiesClientSideTable from '@/components/1time-eachField-multiValues/allergies/db/client-side/structure/allergies-of-a-patient-table.js'

// defining all rows in this object
const clientSideTable = {
  reminders: reminderClientSideTable,
  recommendations: recommendationClientSideTable,
  plan_comments: planCommentsClientSideTable,
  misc_notes: miscNotesClientSideTable,
  process_notes: processNotesClientSideTable,
  family_history: familyHistoryClientSideTable,
  allergies: allergiesClientSideTable,
} // 1st row

import moment from 'moment'

export default {
  data() {
    return {
      currentApptObj: {},
      amendmentData: '',
      isAddendumPopoverVisible: false,
      toggleSwitchShowBodyContent: true,
    }
  },
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
    propComponentName: {
      type: String,
      required: true,
      validator: (value) => Object.keys(clientSideTable).includes(value),
    },
    propFormFields: {
      type: Array,
      required: true,
    },
    propReferToComponentInUiAtPluralClassification: {
      type: String,
    },
  },
  async mounted() {
    if (!this.propApptId === 0) {
      return
    }
    this.currentApptObj = await clientSideTblOfAppointments.find(this.propApptId)
  },
  computed: {
    cfGetReminderStyle() {
      let secondaryDuringComparisonApptObj = {}
      let secondaryDuringComparisonReminders = {}

      const printableApptNoteComponentCardObj = clientSideTblOfLeftSideViewCards.find(2)

      // Goal: Find if current ID matches with firstParam or secondParam. It has to match with one of those 2
      if (printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting'] === this.propApptId) {
        // Handle the case when the current ID matches with the second param Need to compare with first
        secondaryDuringComparisonApptObj = clientSideTblOfAppointments.find(
          printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting']
        )
        secondaryDuringComparisonReminders = this.mfGetArOfReminders(secondaryDuringComparisonApptObj)
        if (secondaryDuringComparisonReminders.length > this.mfGetArOfReminders(this.currentApptObj).length) {
          return 'border:1px solid #E6A23C'
        } else if (secondaryDuringComparisonReminders.length < this.mfGetArOfReminders(this.currentApptObj).length) {
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
          secondaryDuringComparisonApptObj = clientSideTblOfAppointments.find(
            printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting']
          )

          secondaryDuringComparisonReminders = this.mfGetArOfReminders(secondaryDuringComparisonApptObj)
          if (secondaryDuringComparisonReminders.length > this.mfGetArOfReminders(this.currentApptObj).length) {
            return 'border:1px solid #E6A23C'
          } else if (secondaryDuringComparisonReminders.length < this.mfGetArOfReminders(this.currentApptObj).length) {
            return 'border:1px solid #67C23A'
          } else {
            return
          }
        }
      }
      // Nothing to compare with
    },
    cfArOfAddendumForDisplay() {
      const arFromClientSideTblOfAddendums = clientSideTblOfAddendums
        .query()
        .where('appointmentId', this.propApptId)
        .where('component', 'reminders')
        .orderBy('ROW_START', 'asc')
        .get()

      return arFromClientSideTblOfAddendums
    },
  },
  methods: {
    mfOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'multi edit reminders',
      })
    },
    mfOpenAddInEditLayer() {
      const term = 'add ' + this.propComponentName
      console.log(term)
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: term,
      })
    },
    mfSaveAddendum(pAddendumData, component) {
      clientSideTblOfAddendums.insert({
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
    mfGetArOfReminders(pApptObj) {
      if (!pApptObj) return

      console.log(this.propReferToComponentInUiAtPluralClassification)

      let arOfObjectsFromClientSideDB = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTable[this.propComponentName]
          .query()
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTable[this.propComponentName]
          .query()
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }

      return arOfObjectsFromClientSideDB
    },
    cfApptLockDateInHumanReadableFormat() {
      return moment(this.patientCurrentApptObj['ROW_END']).format('MMM DD YYYY HH:mm') // parse integer
    },
  },
}
</script>

<style scoped>
.remindersh3 .el-button-group {
  display: inline-block !important;
}

/* For multi edit */
.el-icon-money:hover {
  font-size: 1rem;
}

/* For add */
.el-icon-circle-plus-outline:hover {
  font-size: 1rem;
}

/* For minimize */
.el-icon-remove-outline:hover {
  font-size: 1rem;
}

.el-icon-edit-outline:hover {
  font-size: 1rem;
}

.el-icon-remove-outline:hover {
  font-size: 1rem;
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
