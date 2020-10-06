<template>
  <div class="A4">
    <el-row type="flex" justify="space-between">
      <el-col :span="4"
        ><div class="grid-content">
          <el-button-group class="h1" style="float: left; display: none">
            <el-button
              @click="mfLeftArrowClickedLetUsGoToPrevAppt"
              class="el-icon-arrow-left"
              style="padding: 3px; color: #c0c4cc; border: none"
            ></el-button>
            <el-button
              class="el-icon-document-copy"
              @click="sendEventToShow2Notes"
              style="padding: 3px; color: #c0c4cc; border: none"
            ></el-button>
          </el-button-group>
        </div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content">
          <h1 style="text-align: center">Appt Note (Confidential)</h1>
        </div></el-col
      >
      <el-col :span="4"
        ><div class="grid-content">
          <el-button-group class="h1" style="display: none">
            <el-button
              class="el-icon-document-copy"
              style="padding: 3px; color: #c0c4cc; border: none"
            ></el-button>
            <el-button
              class="el-icon-arrow-right"
              style="padding: 3px; color: #c0c4cc; border: none"
              @click="mfRightArrowClickedLetUsGoToNextAppt"
            ></el-button>
          </el-button-group></div
      ></el-col>
    </el-row>

    <!-- SECTOION 1 -->
    <h3 style="padding-top: 20px">Name: Vikas K</h3>

    <!-- SECTOION 2 -->
    <h3>Age: 42</h3>

    <!-- SECTOION 3 -->
    <h3>Appt Date: {{ cfGetpatientCurrentApptObj }}</h3>
    <div v-if="debug">
      Debug data. <br />
      1) Appt start time is ->
      {{ patientCurrentApptObj['apptStartMilliSecondsOnCalendar'] | moment }}
      <br />
      2) Appt end (lock) time is -> {{ patientCurrentApptObj['ROW_END'] | moment }}
    </div>

    <!-- SECTOION 4 -->
    <!-- Goal: If appt is not locked then do not show "Appt Lick date" -->
    <div v-if="patientCurrentApptObj['apptStatus'] === 'locked'">
      <h3>Appt locked: {{ cfApptLockDateInHumanReadableFormat }}</h3>
      <div v-if="debug">
        Debug data. <br />
        1) ROW END value for appointments is -> {{ patientCurrentApptObj['ROW_END'] }} <br />
        2) Difference between calendar time and lock time is ->
        {{
          patientCurrentApptObj['ROW_END'] -
          patientCurrentApptObj['apptStartMilliSecondsOnCalendar']
        }}
      </div>
    </div>

    <!-- SECTOION 5  SERVICE STATEMENTS -->
    <el-row type="flex" justify="left" class="ssh3" style="padding-top: 20px; padding-bottom: 10px">
      <el-col :span="8">
        <h3>Service statements</h3>
      </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="visible1">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
            </div>
            <el-button
              slot="reference"
              class="el-icon-edit-outline"
              size="mini"
              style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
            ></el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>
    <div v-for="row in cfArOfServiceStatementForDisplay" :key="`ss-${row.clientSideUniqRowId}`">
      {{ row['tblServiceStatementsMasterLink']['serviceStatementCategory'] }}
      {{ row['tblServiceStatementsMasterLink']['serviceStatementDescription'] }}
    </div>

    <!-- SECTOION 6 MENTAL STATUS EXAM-->
    <el-row
      type="flex"
      justify="left"
      class="mseh3"
      style="padding-top: 20px; padding-bottom: 10px"
    >
      <el-col :span="8">
        <h3>Mental status exam</h3>
      </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="visible2">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
            </div>
            <el-button
              slot="reference"
              class="el-icon-edit-outline"
              size="mini"
              style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
            >
            </el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>
    <div v-for="row in cfArOfMentalStatusExamForDisplay" :key="`mse - ${row.clientSideUniqRowId}`">
      {{ row['tblMentalStatusExamMasterLink']['mentalStatusExamCategory'] }}
      {{ row['tblMentalStatusExamMasterLink']['mentalStatusExamDescription'] }}
    </div>
    <!-- SECTOION 7 Psych review of systems  -->
    <el-row
      type="flex"
      justify="left"
      class="prosh3"
      style="padding-top: 20px; padding-bottom: 10px"
    >
      <el-col :span="8">
        <h3>Psych review of systems</h3>
      </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="visible3">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
            </div>
            <el-button
              slot="reference"
              class="el-icon-edit-outline"
              size="mini"
              style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
            ></el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>

    <div
      v-for="row in cfArOfPsychReviewOfSystemsForDisplay"
      :key="`ros - ${row.clientSideUniqRowId}`"
    >
      {{ row['tblPsychReviewOfSystemsMasterLink']['psychReviewOfSystemsCategory'] }}
      {{ row['tblPsychReviewOfSystemsMasterLink']['psychReviewOfSystemsDescription'] }}
    </div>

    <!-- SECTOION 8 REMINDERS -->
    <el-row
      type="flex"
      justify="left"
      class="remindersh3"
      style="padding-top: 20px; padding-bottom: 10px"
    >
      <el-col :span="8">
        <h3 class="remindersh3">Reminders</h3>
      </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="visible4">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
            </div>
            <el-button
              slot="reference"
              class="el-icon-edit-outline"
              style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
            ></el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>
    <div v-for="row in cfArOfRemindersForDisplay[0]" :key="row.clientSideUniqRowId">
      {{ row['description'] }}
    </div>
    <div v-if="debug">
      <hr />
      Debug data. <br />
      Conditions to show a reminder: <br />
      Condition 1: rem was created before the apptlock time(= ROW_END of appt) <br />
      Condition 2: rem was deleted (ROW_END of rem) after the apptlock time(= ROW_END of appt)
      <br />
      <hr />
      <div v-for="rem in cfArOfRemindersForDisplay[1]" :key="rem.clientSideUniqRowId">
        Loop start
        <hr />
        {{ rem }} <br />
        <hr />
        Condition 1: <br />
        Was this reminder created {{ rem['ROW_START'] | moment }} before the appt ended
        {{ patientCurrentApptObj['ROW_END'] | moment }} (Following should be +ve):
        {{ patientCurrentApptObj['ROW_END'] - rem['ROW_START'] }}
        <br />
        <hr />
        Condition 2: Reminder Deleted at: {{ rem['ROW_END'] | moment }} <br />
        Was this reminder deleted {{ rem['ROW_END'] }} after the appt ended
        {{ patientCurrentApptObj['ROW_END'] | moment }} (Following should be +ve):
        {{ rem['ROW_END'] - patientCurrentApptObj['ROW_END'] }}
        <br />
        <hr />
      </div>
    </div>

    <!-- SECTOION 9: Recommendations -->
    <el-row
      type="flex"
      justify="left"
      class="recommendationsh3"
      style="padding-top: 20px; padding-bottom: 10px"
    >
      <el-col :span="8"> <h3>Recommendations</h3> </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="visible5">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
            </div>
            <el-button
              slot="reference"
              class="el-icon-edit-outline"
              style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
            ></el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>

    <!-- SECTOION 10: Medications -->
    <el-row
      type="flex"
      justify="left"
      class="medicationsh3"
      style="padding-top: 20px; padding-bottom: 10px"
    >
      <el-col :span="8"> <h3>Medications</h3> </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="visible6">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
            </div>
            <el-button
              slot="reference"
              class="el-icon-edit-outline"
              style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
            ></el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>

    <!-- SECTOION 11 -->
    <el-row
      type="flex"
      justify="left"
      class="vitalsh3"
      style="padding-top: 20px; padding-bottom: 10px"
    >
      <el-col :span="8"> <h3>Vitals</h3> </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="visible7">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
            </div>
            <el-button
              slot="reference"
              class="el-icon-edit-outline"
              style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
            ></el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>

    <!-- SECTOION 12 -->
    <div v-if="patientCurrentApptObj['apptStatus'] !== 'locked'">
      <el-button @click="lockButtonClicked" type="primary">Reviewed - Lock the note </el-button>
    </div>

    <!-- End of template -->
  </div>
</template>

<script>
// Data tables
import clientSideTblOfPatientServiceStatements from '@/components/ptinfo-single/1time-Mrow-1Field/service-statement/db/client-side/structure/patient-table-of-service-statements.js'
import clientSideTblOfPatientReminders from '@/components/ptinfo-single/1time-Mrow-1Field/reminder/db/client-side/structure/reminders-of-a-patient-table.js'
import clientSideTblOfMentalStatusExam from '@/components/ptinfo-single/1time-1row-mField/mental-status-exam/db/client-side/structure/patient-table-of-mental-status-exam.js'
import clientSideTblOfPsychReviewOfSystems from '@/components/ptinfo-single/1time-1row-mField/psych-review-of-systems/db/client-side/structure/patient-table-of-psych-review-of-systems.js'

// init tables
import clientSideTblOfMultiStateViewCards from '@/components/core/mts-view-layer-cards/db/client-side/structure/mts-table.js'
import clientSideTblOfAppointments from '@/components/ptinfo-single/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'

// This component to show 2 notes side by side
import apptNotePrintableView from '@/components/ptinfo-combined/appt-note-printable-with-amendment-feature/print-view-1.vue'

// Library
import moment from 'moment'

export default {
  data() {
    return {
      patientCurrentApptObj: [],
      debug: false,
      amendmentData: '',
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      drawerToShowComparisonOf2Notes: false,
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    },
  },
  components: { apptNotePrintableView },
  computed: {
    cfGetpatientCurrentApptObj() {
      // Goal1 -> Find the appt ID chosen by the user
      const apptNoteComponentVisibilityCurrentValue = clientSideTblOfMultiStateViewCards.find(2)
      const currentApptId =
        apptNoteComponentVisibilityCurrentValue['componentCurrentValueForCustomizingViewState']

      /* Goal: Show green around data that has been added. Red around data that has been deleted */
      // Finding the prev and next appt ID

      // get appt details from appt table
      this.patientCurrentApptObj = clientSideTblOfAppointments.find(currentApptId)

      const apptStartMilliSeconds = this.patientCurrentApptObj['apptStartMilliSecondsOnCalendar']
      return moment(apptStartMilliSeconds).format('MMM DD YYYY HH:mm') // parse integer
    },
    cfArOfServiceStatementForDisplay() {
      let arOfObjectsFromClientSideDB = []
      if (this.patientCurrentApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
          .query()
          .with('tblServiceStatementsMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
          .query()
          .with('tblServiceStatementsMasterLink')
          .where('ROW_END', (value) => value > this.patientCurrentApptObj['ROW_END'])
          .where('ROW_START', (value) => value < this.patientCurrentApptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientSideDB
    },

    cfArOfRemindersForDisplay() {
      let userSelectedApptReminderArray = []

      if (this.patientCurrentApptObj['apptStatus'] === 'unlocked') {
        userSelectedApptReminderArray[0] = clientSideTblOfPatientReminders
          .query()
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        userSelectedApptReminderArray[0] = clientSideTblOfPatientReminders
          .query()
          .where('ROW_END', (value) => value > this.patientCurrentApptObj['ROW_END'])
          .where('ROW_START', (value) => value < this.patientCurrentApptObj['ROW_END'])
          .get()
      }
      userSelectedApptReminderArray[1] = clientSideTblOfPatientReminders.query().get()

      // Create the reminder array for previous appt

      // create the reminder array for next appt

      return userSelectedApptReminderArray
    },
    cfArOfMentalStatusExamForDisplay() {
      let arOfObjectsFromClientSideDB = []
      if (this.patientCurrentApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblOfMentalStatusExam
          .query()
          .with('tblMentalStatusExamMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblOfMentalStatusExam
          .query()
          .with('tblMentalStatusExamMasterLink')
          .where('ROW_END', (value) => value > this.patientCurrentApptObj['ROW_END'])
          .where('ROW_START', (value) => value < this.patientCurrentApptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientSideDB
    },

    cfArOfPsychReviewOfSystemsForDisplay() {
      let arOfObjectsFromClientSideDB = []
      if (this.patientCurrentApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblOfPsychReviewOfSystems
          .query()
          .with('tblPsychReviewOfSystemsMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblOfPsychReviewOfSystems
          .query()
          .with('tblPsychReviewOfSystemsMasterLink')
          .where('ROW_END', (value) => value > this.patientCurrentApptObj['ROW_END'])
          .where('ROW_START', (value) => value < this.patientCurrentApptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientSideDB
    },

    cfApptLockDateInHumanReadableFormat() {
      return moment(this.patientCurrentApptObj['ROW_END']).format('MMM DD YYYY HH:mm') // parse integer
    },
  },
  methods: {
    sendEventToShow2Notes() {
      this.$root.$emit('event-from-ct-note-print-view-1-show-comparison-drawer')
    },
    mfLeftArrowClickedLetUsGoToPrevAppt() {
      const currentApptId = this.patientCurrentApptObj['clientSideUniqRowId']

      const clientSideArray = clientSideTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] < currentApptId) {
          const updateState = clientSideTblOfMultiStateViewCards.update({
            clientSideUniqRowId: 2,
            componentCurrentValueForCustomizingViewState: clientSideArray[i]['clientSideUniqRowId'],
          })
        }
      }
      return
    },
    mfRightArrowClickedLetUsGoToNextAppt() {
      // From appts table find if there is a ID greater then this in the state of locked or unlocked

      const currentApptId = this.patientCurrentApptObj['clientSideUniqRowId']

      /* TODO @raj The followijg query does not work
      Becasue the query does not work I have to run another for loop in line 485
      const clientSideArray = clientSideTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .where('clientSideUniqRowId', (value) => parseint(value) < currentApptId)
        .get()

      */

      const clientSideArray = clientSideTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] > currentApptId) {
          const updateState = clientSideTblOfMultiStateViewCards.update({
            clientSideUniqRowId: 2,
            componentCurrentValueForCustomizingViewState: clientSideArray[i]['clientSideUniqRowId'],
          })
        }
      }
      return
    },

    async lockButtonClicked() {
      console.log('lock button clicked')
      const clientSideUniqRowId = this.patientCurrentApptObj['clientSideUniqRowId']
      let arOfObjectsFromClientSideDB = await clientSideTblOfAppointments.update({
        where: clientSideUniqRowId,
        data: {
          apptStatus: 'locked',
          ROW_END: Math.floor(Date.now()), // The query sent to server is "delete"
        },
      })

      // In case there are no more appt then insert a appt. This is for testing.
      arOfObjectsFromClientSideDB = await clientSideTblOfAppointments
        .query()
        .where('apptStatus', 'unlocked')
        .get()

      if (arOfObjectsFromClientSideDB.length === 0) {
        await clientSideTblOfAppointments.insert({
          data: {
            apptStartMilliSecondsOnCalendar: Math.floor(Date.now()),
            apptProviderUuid: 1,
            apptStatus: 'unlocked',
            ROW_START: Math.floor(Date.now()),
          },
        })
      }
    },
  },
}
</script>

<style scoped>
/* Ref: https://stackoverflow.com/questions/39486352/a4-page-like-layout-in-html  */
.A4 {
  background: white;
  width: 21cm;
  height: 29.7cm;
  display: block;
  margin: 0 auto;
  padding: 2cm;
  font-size: 12px;
  margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
}

.el-row:hover .h1 {
  display: inline-block !important;
}

.ssh3:hover .el-icon-edit-outline {
  display: inline-block !important;
}

.mseh3:hover .el-icon-edit-outline {
  display: inline-block !important;
}

.prosh3:hover .el-icon-edit-outline {
  display: inline-block !important;
}

.remindersh3:hover .el-icon-edit-outline {
  display: inline-block !important;
}

.recommendationsh3:hover .el-icon-edit-outline {
  display: inline-block !important;
}

.medicationsh3:hover .el-icon-edit-outline {
  display: inline-block !important;
}

.vitalsh3:hover .el-icon-edit-outline {
  display: inline-block !important;
}
</style>
