<template>
  <el-card>
    <highcharts :options="chartOptions"></highcharts>
  </el-card>
</template>

<script>
import clientSideTblOfPatientServiceStatements from '@/components/pt-info/single/1time-Mrow-1Field/service-statement/db/client-side/structure/patient-table-of-service-statements.js'

import clientSideTblOfPatientReminders from '@/components/pt-info/single/1time-Mrow-1Field/reminder/db/client-side/structure/reminders-of-a-patient-table.js'

import clientSideTblOfMentalStatusExam from '@/components/pt-info/single/1time-1row-mField/mental-status-exam/db/client-side/structure/patient-table-of-mental-status-exam.js'
import { Chart } from 'highcharts-vue'

export default {
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      chartOptions: {
        xAxis: [
          {
            title: {
              text: 'Measurement date',
            },
            type: 'datetime',
            labels: {
              enabled: 'true',
              format: '{value:%m-%Y}', // X axis now shows month and year
            },
          },
        ],
        title: {
          text: 'Correlate',
        }, // Reason: Y axis will have clientSideTable.entity for e.g. "weight" written beside it. This is small space. Difficult design decisions need to be made instead of doing everything.

        series: [
          {
            data: [0, 0, 0], // sample data
            name: 'Appointments',
          },
          {
            data: [0, 0, 0], // sample data
            name: 'Weight',
          },
          {
            data: [0, 0, 0], // sample data
            name: 'Height',
          },
        ],

        credits: {
          enabled: false,
        },
      },
    }
  },
  computed: {
    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
        .query()
        .with('tblServiceStatementsMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()
      return arOfObjectsFromClientSideDB
    },

    cfArOfRemindersForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientReminders
        .query()
        .where('ROW_END', 2147483647.999999)
        .get()
      return arOfObjectsFromClientSideDB
    },
    cfArOfMentalStatusExamForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()
      console.log(arOfObjectsFromClientSideDB)
      return arOfObjectsFromClientSideDB
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
