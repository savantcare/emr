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
    return {}
  },
  computed: {
    chartOptions() {
      const chart = {
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
          {
            //            data: this.cfArOfRemindersForDisplay, // sample data
            data: this.cfArOfRemindersForDisplay, // sample data
            name: 'Reminders',
          },
        ],

        credits: {
          enabled: false,
        },
      }

      return chart
    },
    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
        .query()
        .with('tblServiceStatementsMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()
      return arOfObjectsFromClientSideDB
    },

    cfBasicConcept() {
      var data = new Array()

      // All highcharts cares about are 0 and 1 values it does not care about the field / key names
      data.push([2, 2])

      data.push([4, 4])

      // This will work but show wrong graph since this will be taken as two values and not an array of values
      data.push(5, 5)

      // This will not work since each point needs to be array and not a object
      var firstError = new Object()
      firstError[0] = 6
      firstError[1] = 6
      data.push(firstError)

      // This will not work since each point should not have field name. It should just have a index.
      var secondError = new Object()
      secondError['row'] = 8
      secondError['value'] = 8
      data.push(secondError)

      console.log(data)

      // Only 2,2 and 4,4 will be shown on graph

      return data
    },
    cfArOfRemindersForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientReminders
        .query()
        .where('ROW_END', 2147483647.999999)
        .get()
      console.log(arOfObjectsFromClientSideDB)

      var arDataToShowOnGraph = new Array()

      for (let i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        arDataToShowOnGraph.push([arOfObjectsFromClientSideDB[i].ROW_START, 0])
      }

      console.log(arDataToShowOnGraph)
      return arDataToShowOnGraph
    },
    cfArOfMentalStatusExamForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()
      console.log(arOfObjectsFromClientSideDB)
      const data = [10, 10, 10]
      return data
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
