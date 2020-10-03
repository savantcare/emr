<template>
  <div class="A4">
    <h1 style="text-align: center">Appt Note (Confidential)</h1>

    <h3 style="padding-top: 20px">Name: Vikas K</h3>
    <h3>Age: 42</h3>
    <h3>Appt Date: {{ cfGetApptDetails }}</h3>

    <!-- Goal: If appt is not locked then do not show "Appt Lick date" -->
    <div v-if="apptDetails['apptStatus'] === 'locked'">
      <h3>Appt locked: {{ cfApptLockDateInHumanReadableFormat }}</h3>
    </div>
    <h3 style="padding-top: 20px; padding-bottom: 5px">Service statements</h3>

    <div v-for="row in cfArOfServiceStatementForDisplay" :key="row.clientSideUniqRowId">
      {{ row['tblServiceStatementsMasterLink']['serviceStatementCategory'] }}
      {{ row['tblServiceStatementsMasterLink']['serviceStatementDescription'] }}
    </div>

    <h3 style="padding-top: 20px; padding-bottom: 5px">Mental status exam</h3>
    <div v-for="row in cfArOfMentalStatusExamForDisplay" :key="row.clientSideUniqRowId">
      {{ row['tblMentalStatusExamMasterLink']['mentalStatusExamCategory'] }}
      {{ row['tblMentalStatusExamMasterLink']['mentalStatusExamDescription'] }}
    </div>

    <h3 style="padding-top: 20px; padding-bottom: 5px">Psych review of systems</h3>
    <h3 style="padding-top: 20px; padding-bottom: 5px">Reminders</h3>

    <div v-for="row in cfArOfRemindersForDisplay" :key="row.clientSideUniqRowId">
      {{ row['description'] }}
    </div>

    <h3 style="padding-top: 20px; padding-bottom: 5px">Recommendations</h3>
    <h3 style="padding-top: 20px; padding-bottom: 5px">Medications</h3>
    <h3 style="padding-top: 20px; padding-bottom: 5px">Body measurements</h3>
    <div v-if="apptDetails['apptStatus'] !== 'locked'">
      <el-button @click="lockButtonClicked" type="primary">Reviewed - Lock the note </el-button>
    </div>
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
      apptDetails: [],
    }
  },
  computed: {
    cfGetApptDetails() {
      // Goal1 -> Find the appt ID chosen by the user
      const apptNoteComponentVisibilityCurrentValue = clientSideTblOfMultiStateViewCards.find(2)
      const apptID =
        apptNoteComponentVisibilityCurrentValue['componentCurrentValueForCustomizingViewState']

      // get appt details from appt table
      this.apptDetails = clientSideTblOfAppointments.find(apptID)

      const apptStartMilliSeconds = this.apptDetails['apptStartMilliSecondsOnCalendar']
      return moment(apptStartMilliSeconds).format('MMM DD YYYY HH:mm') // parse integer
    },
    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
        .query()
        .with('tblServiceStatementsMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()
      return arOfObjectsFromClientSideDB
    },

    cfArOfRemindersForDisplay() {
      const apptLockTimeInMilliseconds = this.apptDetails['ROW_END']

      const arOfObjectsFromClientSideDB = clientSideTblOfPatientReminders
        .query()
        .where('ROW_END', (value) => value > apptLockTimeInMilliseconds)
        .get()

      return arOfObjectsFromClientSideDB
    },
    cfArOfMentalStatusExamForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()
      return arOfObjectsFromClientSideDB
    },
    cfApptLockDateInHumanReadableFormat() {
      return moment(this.apptDetails['ROW_END']).format('MMM DD YYYY HH:mm') // parse integer
    },
  },
  methods: {
    lockButtonClicked() {
      console.log('lock button clicked')
      const clientSideUniqRowId = this.apptDetails['clientSideUniqRowId']
      let arOfObjectsFromClientSideDB = clientSideTblOfAppointments.update({
        where: clientSideUniqRowId,
        data: {
          apptStatus: 'locked',
          ROW_END: Math.floor(Date.now()), // Everywhere in the code time has to be in milliseconds
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
            apptStartMilliSecondsOnCalendar: Math.floor(Date.now()) + 65000,
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
