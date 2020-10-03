<template>
  <div class="A4">
    <h1 style="text-align: center">Appt Note (Confidential)</h1>

    <!-- SECTOION 1 -->
    <h3 style="padding-top: 20px">Name: Vikas K</h3>

    <!-- SECTOION 2 -->
    <h3>Age: 42</h3>

    <!-- SECTOION 3 -->
    <h3>Appt Date: {{ cfGetapptObj }}</h3>
    <div v-if="debug">
      Debug data. <br />
      1) Appt start time is -> {{ apptObj['apptStartMilliSecondsOnCalendar'] | moment }} <br />
      2) Appt end (lock) time is -> {{ apptObj['ROW_END'] | moment }}
    </div>

    <!-- SECTOION 4 -->
    <!-- Goal: If appt is not locked then do not show "Appt Lick date" -->
    <div v-if="apptObj['apptStatus'] === 'locked'">
      <h3>Appt locked: {{ cfApptLockDateInHumanReadableFormat }}</h3>
      <div v-if="debug">
        Debug data. <br />
        1) ROW END value for appointments is -> {{ apptObj['ROW_END'] }} <br />
        2) Difference between calendar time and lock time is ->
        {{ apptObj['ROW_END'] - apptObj['apptStartMilliSecondsOnCalendar'] }}
      </div>
    </div>

    <!-- SECTOION 5  SERVICE STATEMENTS -->
    <h3 style="padding-top: 20px; padding-bottom: 5px">
      Service statements
      <el-popover placement="right" width="400" v-model="visible1">
        <div style="text-align: right; margin: 0">
          <el-input type="textarea" :rows="4" v-model="data"></el-input>
        </div>
        <el-button slot="reference" class="el-icon-edit-outline" size="mini" circle></el-button>
      </el-popover>
    </h3>
    <div v-for="row in cfArOfServiceStatementForDisplay" :key="`ss-${row.clientSideUniqRowId}`">
      {{ row['tblServiceStatementsMasterLink']['serviceStatementCategory'] }}
      {{ row['tblServiceStatementsMasterLink']['serviceStatementDescription'] }}
    </div>

    <!-- SECTOION 6 -->
    <h3 style="padding-top: 20px; padding-bottom: 5px">
      Mental status exam
      <el-popover placement="right" width="400" v-model="visible2">
        <div style="text-align: right; margin: 0">
          <el-input type="textarea" :rows="4" v-model="data"></el-input>
        </div>
        <el-button slot="reference" class="el-icon-edit-outline" size="mini" circle></el-button>
      </el-popover>
    </h3>
    <div v-for="row in cfArOfMentalStatusExamForDisplay" :key="`mse - ${row.clientSideUniqRowId}`">
      {{ row['tblMentalStatusExamMasterLink']['mentalStatusExamCategory'] }}
      {{ row['tblMentalStatusExamMasterLink']['mentalStatusExamDescription'] }}
    </div>
    <!-- SECTOION 7 -->
    <h3 style="padding-top: 20px; padding-bottom: 5px">
      Psych review of systems
      <el-popover placement="right" width="400" v-model="visible3">
        <div style="text-align: right; margin: 0">
          <el-input type="textarea" :rows="4" v-model="data"></el-input>
        </div>
        <el-button slot="reference" class="el-icon-edit-outline" size="mini" circle></el-button>
      </el-popover>
    </h3>

    <!-- SECTOION 8 REMINDERS -->
    <h3 style="padding-top: 20px; padding-bottom: 5px">
      Reminders
      <el-popover placement="right" width="400" v-model="visible4">
        <div style="text-align: right; margin: 0">
          <el-input type="textarea" :rows="4" v-model="data"></el-input>
        </div>
        <el-button slot="reference" class="el-icon-edit-outline" size="mini" circle></el-button>
      </el-popover>
    </h3>
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
        {{ apptObj['ROW_END'] | moment }} (Following should be +ve):
        {{ apptObj['ROW_END'] - rem['ROW_START'] }}
        <br />
        <hr />
        Condition 2: Reminder Deleted at: {{ rem['ROW_END'] | moment }} <br />
        Was this reminder deleted {{ rem['ROW_END'] }} after the appt ended
        {{ apptObj['ROW_END'] | moment }} (Following should be +ve):
        {{ rem['ROW_END'] - apptObj['ROW_END'] }}
        <br />
        <hr />
      </div>
    </div>

    <!-- SECTOION 9 -->
    <h3 style="padding-top: 20px; padding-bottom: 5px">
      Recommendations
      <el-popover placement="right" width="400" v-model="visible5">
        <div style="text-align: right; margin: 0">
          <el-input type="textarea" :rows="4" v-model="data"></el-input>
        </div>
        <el-button slot="reference" class="el-icon-edit-outline" size="mini" circle></el-button>
      </el-popover>
    </h3>

    <!-- SECTOION 10 -->
    <h3 style="padding-top: 20px; padding-bottom: 5px">
      Medications
      <el-popover placement="right" width="400" v-model="visible6">
        <div style="text-align: right; margin: 0">
          <el-input type="textarea" :rows="4" v-model="data"></el-input>
        </div>
        <el-button slot="reference" class="el-icon-edit-outline" size="mini" circle></el-button>
      </el-popover>
    </h3>

    <!-- SECTOION 11 -->
    <h3 style="padding-top: 20px; padding-bottom: 5px">
      Body measurements
      <el-popover placement="right" width="400" v-model="visible7">
        <div style="text-align: right; margin: 0">
          <el-input type="textarea" :rows="4" v-model="data"></el-input>
        </div>
        <el-button slot="reference" class="el-icon-edit-outline" size="mini" circle></el-button>
      </el-popover>
    </h3>

    <!-- SECTOION 12 -->
    <div v-if="apptObj['apptStatus'] !== 'locked'">
      <el-button @click="lockButtonClicked" type="primary">Reviewed - Lock the note </el-button>
    </div>

    <!-- End of template -->
  </div>
</template>

<script>
// Data tables
import clientSideTblOfPatientServiceStatements from '@/components/pt-info/single/1time-Mrow-1Field/service-statement/db/client-side/structure/patient-table-of-service-statements.js'
import clientSideTblOfPatientReminders from '@/components/pt-info/single/1time-Mrow-1Field/reminder/db/client-side/structure/reminders-of-a-patient-table.js'
import clientSideTblOfMentalStatusExam from '@/components/pt-info/single/1time-1row-mField/mental-status-exam/db/client-side/structure/patient-table-of-mental-status-exam.js'

// init tables
import clientSideTblOfMultiStateViewCards from '@/components/core/mts-view-layer-cards/db/client-side/structure/mts-table.js'
import clientSideTblOfAppointments from '@/components/pt-info/single/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'

// Library
import moment from 'moment'

export default {
  data() {
    return {
      apptObj: [],
      debug: false,
      data: '',
      visible1: true,
      visible2: true,
      visible3: true,
      visible4: true,
      visible5: true,
      visible6: true,
      visible7: true,
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    },
  },
  computed: {
    cfGetapptObj() {
      // Goal1 -> Find the appt ID chosen by the user
      const apptNoteComponentVisibilityCurrentValue = clientSideTblOfMultiStateViewCards.find(2)
      const apptID =
        apptNoteComponentVisibilityCurrentValue['componentCurrentValueForCustomizingViewState']

      // get appt details from appt table
      this.apptObj = clientSideTblOfAppointments.find(apptID)

      console.log(this.apptObj)

      const apptStartMilliSeconds = this.apptObj['apptStartMilliSecondsOnCalendar']
      return moment(apptStartMilliSeconds).format('MMM DD YYYY HH:mm') // parse integer
    },
    cfArOfServiceStatementForDisplay() {
      let arOfObjectsFromClientSideDB = []
      if (this.apptObj['apptStatus'] === 'un-locked') {
        arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
          .query()
          .with('tblServiceStatementsMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
          .query()
          .with('tblServiceStatementsMasterLink')
          .where('ROW_END', (value) => value > this.apptObj['ROW_END'])
          .where('ROW_START', (value) => value < this.apptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientSideDB
    },

    cfArOfRemindersForDisplay() {
      let reminderArray = []

      if (this.apptObj['apptStatus'] === 'un-locked') {
        this.apptObj['ROW_END'] = Math.floor(Date.now())
      }
      const arOfPresentObjectsFromClientSideDB = clientSideTblOfPatientReminders
        .query()
        .where('ROW_END', (value) => value > this.apptObj['ROW_END'])
        .where('ROW_START', (value) => value < this.apptObj['ROW_END'])
        .get()

      const arOfAllObjectsFromClientSideDB = clientSideTblOfPatientReminders.query().get()

      reminderArray[0] = arOfPresentObjectsFromClientSideDB
      reminderArray[1] = arOfAllObjectsFromClientSideDB
      return reminderArray
    },
    cfArOfMentalStatusExamForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .where('ROW_END', 2147483648000)
        .get()
      return arOfObjectsFromClientSideDB
    },
    cfApptLockDateInHumanReadableFormat() {
      return moment(this.apptObj['ROW_END']).format('MMM DD YYYY HH:mm') // parse integer
    },
  },
  methods: {
    lockButtonClicked() {
      console.log('lock button clicked')
      const clientSideUniqRowId = this.apptObj['clientSideUniqRowId']
      let arOfObjectsFromClientSideDB = clientSideTblOfAppointments.update({
        where: clientSideUniqRowId,
        data: {
          apptStatus: 'locked',
          ROW_END: Math.floor(Date.now()), // The query sent to server is "delete"
        },
      })

      // In case there are no more appt then insert a appt. This is for testing.
      arOfObjectsFromClientSideDB = clientSideTblOfAppointments
        .query()
        .where('apptStatus', 'un-locked')
        .get()

      if (arOfObjectsFromClientSideDB.length === 0) {
        clientSideTblOfAppointments.insert({
          data: {
            apptStartMilliSecondsOnCalendar: Math.floor(Date.now()),
            apptProviderUUID: 1,
            apptStatus: 'un-locked',
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
</style>
