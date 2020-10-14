<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
import clientSideTblOfPatientServiceStatements from '@/components/1time-Mrow-1Field/service-statement/db/client-side/structure/patient-table-of-service-statements.js'

import clientSideTblOfPatientReminders from '@/components/1time-Mrow-1Field/reminder/db/client-side/structure/reminders-of-a-patient-table.js'

import clientSideTblOfMentalStatusExam from '@/components/1time-1row-mField/mental-status-exam/db/client-side/structure/patient-table-of-mental-status-exam.js'
import clientSideTblWeight from '@/components/1time-1row-mField/vital-signs/sub-cts/weight/db/client-side/structure/table.js'
import clientSideTblHeight from '@/components/1time-1row-mField/vital-signs/sub-cts/height/db/client-side/structure/table.js'
import clientSideTblOxygenSaturation from '@/components/1time-1row-mField/vital-signs/sub-cts/oxygen-saturation/db/client-side/structure/table.js'

// For pros
import clientSideTblOfMasterPsychReviewOfSystems from '@/components/1time-1row-mField/psych-review-of-systems/db/client-side/structure/master-table-of-psych-review-of-systems.js'
import clientSideTblOfPatientPsychReviewOfSystems from '@/components/1time-1row-mField/psych-review-of-systems/db/client-side/structure/patient-table-of-psych-review-of-systems.js'

import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'

import { Chart } from 'highcharts-vue'

export default {
  components: {
    highcharts: Chart,
  },
  data() {
    return {}
  },
  methods: {
    mfGetProsOnApptLockDate(pApptObj) {
      if (!pApptObj) return

      let arOfObjectsFromClientSideRos = []
      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideRos = clientSideTblOfPatientPsychReviewOfSystems
          .query()
          .with('tblPsychReviewOfSystemsMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideRos = clientSideTblOfPatientPsychReviewOfSystems
          .query()
          .with('tblPsychReviewOfSystemsMasterLink')
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }

      let groupTotal = []
      let catName = ''
      let value = 0
      for (let i = 0; i < arOfObjectsFromClientSideRos.length; i++) {
        catName =
          arOfObjectsFromClientSideRos[i]['tblPsychReviewOfSystemsMasterLink'][
            'psychReviewOfSystemsCategory'
          ]
        if (!groupTotal[catName]) groupTotal[catName] = 0
        if (arOfObjectsFromClientSideRos[i]['psychReviewOfSystemsFieldValue'] !== null) {
          value = arOfObjectsFromClientSideRos[i]['psychReviewOfSystemsFieldValue']
          groupTotal[catName] = parseFloat(groupTotal[catName]) + parseFloat(value)
        }
      }
      return groupTotal['Depression']
    },
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
          text: '',
        }, // Reason: Y axis will have clientSideTable.entity for e.g. "weight" written beside it. This is small space. Difficult design decisions need to be made instead of doing everything.

        series: [
          // { data: this.cfBasicConcept, name: 'Basic concept' },
          // { data: [0, 0, 0], name: 'Appointments' },
          // { data: this.cfArOfRemindersForDisplay, name: 'Reminders' },
          // { data: this.cfGetHeightDataForGraph, name: 'Height' },
          {
            name: 'Weight',
            data: this.cfGetWeightDataForGraph,
            dashStyle: 'longdash',
            tooltip: {
              pointFormatter: function () {
                return this.series.name + ' ' + this.y + '% of max</b>'
              },
            },
          },
          {
            name: 'Spo2',
            data: this.cfGetOxygenSaturationDataForGraph,
            dashStyle: 'shortdot',
            tooltip: {
              pointFormatter: function () {
                return this.series.name + ' ' + this.y + '% of max</b>'
              },
            },
          },
          {
            name: 'pros: depression',
            data: this.cfGetProsDepressionDataForGraph,
            dashStyle: 'shortdot',
            tooltip: {
              pointFormatter: function () {
                return this.series.name + ' ' + this.y + '% of max</b>'
              },
            },
          },
          {
            name: 'service statements',
            data: this.cfArOfServiceStatementsForGraph,
            dashStyle: 'shortdot',
            tooltip: {
              headerFormat: '<small>Service statement: {point.key}</small><br>',
              pointFormatter: function () {
                // console.log(this) // To see , what data you can access
                return this.tooltip
              },
            },
          },
        ],
        chart: {
          width: 720, // on page load default width should be 50% of page width, ie; 700px. We have developed this software to run on 1440*900
        },
        credits: {
          enabled: false,
        },
      }

      return chart
    },

    cfGetProsDepressionDataForGraph() {
      // Where clause  needs to change to not reviewed time
      // Also need to run it for everytime the note has been reviewed

      // Goal: Find all times in the appt table when the appt was locked.

      const arOfApts = clientSideTblOfAppointments
        .query()
        .where('apptStatus', 'locked')
        .orWhere('apptStatus', 'unlocked')
        .get()

      const maxValue = 8

      const arDataToShowOnGraph = []

      let timeOfMeasurementInMilliseconds = 0

      for (let i = 0; i < arOfApts.length; i++) {
        let depressionScore = this.mfGetProsOnApptLockDate(arOfApts[i])
        if (!depressionScore) continue
        let graphData = (depressionScore / maxValue) * 100
        if (arOfApts[i]['ROW_END'] === 2147483648000) {
          // This means it is current data
          timeOfMeasurementInMilliseconds = Math.floor(Date.now())
        } else {
          timeOfMeasurementInMilliseconds = arOfApts[i]['ROW_END']
        }
        graphData = Math.round(graphData)
        arDataToShowOnGraph.push([timeOfMeasurementInMilliseconds, graphData])
      }

      return arDataToShowOnGraph
    },

    cfGetHeightDataForGraph() {
      const arDataToShowOnGraph = []
      const data = clientSideTblHeight.all()
      const numberOfPointsOnGraph = data.length
      if (numberOfPointsOnGraph > 0) {
        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          const timeOfMeasurementInMilliseconds = data[i].timeOfMeasurementInMilliseconds
          const graphData = data[i][clientSideTblHeight.graphSeries1FieldName]
          arDataToShowOnGraph.push([timeOfMeasurementInMilliseconds, graphData])
        }
        return arDataToShowOnGraph
      } else {
        return null
      }
    },

    cfGetWeightDataForGraph() {
      const arDataToShowOnGraph = []
      const data = clientSideTblWeight.all() // .all is built into vuex-orm and will return all records
      const numberOfPointsOnGraph = data.length
      if (numberOfPointsOnGraph > 0) {
        // Goal: Find the max value. So percentage can be made.
        let maxGraphData = 0
        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          const graphData = data[i][clientSideTblWeight.graphSeries1FieldName]
          if (graphData > maxGraphData) {
            maxGraphData = graphData
          }
        }

        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          const timeOfMeasurementInMilliseconds = data[i].timeOfMeasurementInMilliseconds
          const graphData =
            (data[i][clientSideTblWeight.graphSeries1FieldName] / maxGraphData) * 100
          graphData = Math.round(graphData)
          arDataToShowOnGraph.push([timeOfMeasurementInMilliseconds, graphData])
        }
        return arDataToShowOnGraph
      } else {
        return null
      }
    },

    cfGetOxygenSaturationDataForGraph() {
      const arDataToShowOnGraph = []
      const data = clientSideTblOxygenSaturation.all()
      const numberOfPointsOnGraph = data.length

      if (numberOfPointsOnGraph > 0) {
        // find the max value
        let maxGraphData = 0
        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          const graphData = data[i][clientSideTblOxygenSaturation.graphSeries1FieldName]
          if (graphData > maxGraphData) {
            maxGraphData = graphData
          }
        }

        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          const timeOfMeasurementInMilliseconds = data[i].timeOfMeasurementInMilliseconds
          const graphData =
            (data[i][clientSideTblOxygenSaturation.graphSeries1FieldName] / maxGraphData) * 100
          graphData = Math.round(graphData)
          arDataToShowOnGraph.push([timeOfMeasurementInMilliseconds, graphData])
        }
        return arDataToShowOnGraph
      } else {
        return null
      }
    },

    cfArOfServiceStatementsForGraph() {
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
        .query()
        .with('tblServiceStatementsMasterLink')
        .where('ROW_END', 2147483648000)
        .get()

      const arDataToShowOnGraph = []

      for (let i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        const timeOfMeasurementInMilliseconds = arOfObjectsFromClientSideDB[i].ROW_START

        arDataToShowOnGraph.push({
          x: timeOfMeasurementInMilliseconds,
          y: 50,
          tooltip:
            arOfObjectsFromClientSideDB[i].tblServiceStatementsMasterLink.serviceStatementCategory +
            ' ' +
            arOfObjectsFromClientSideDB[i].tblServiceStatementsMasterLink
              .serviceStatementDescription,
        })
      }
      return arDataToShowOnGraph
    },

    cfBasicConcept() {
      var data = new Array()

      // Works: All highcharts cares about are 0 and 1 values it does not care about the field / key names
      data.push([2, 2])

      data.push([4, 4])

      // Works: but show wrong graph since this will be taken as two values and not an array of values
      data.push(5, 5)

      // Not work: since each point needs to be array and not a object
      var firstError = new Object()
      firstError[0] = 6
      firstError[1] = 6
      data.push(firstError)

      // Not work: since each point should not have field name. It should just have a index.
      var secondError = new Object()
      secondError['row'] = 8
      secondError['value'] = 8
      data.push(secondError)

      // Only 2,2 and 4,4 will be shown on graph

      return data
    },
    cfArOfRemindersForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientReminders
        .query()
        .where('ROW_END', 2147483648000)
        .get()

      var arDataToShowOnGraph = new Array()

      for (let i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        arDataToShowOnGraph.push([arOfObjectsFromClientSideDB[i].ROW_START, 0])
      }

      return arDataToShowOnGraph
    },
    cfArOfMentalStatusExamForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .where('ROW_END', 2147483648000)
        .get()
      const data = [10, 10, 10]
      return data
    },
  },
}
</script>

<style>
/**
css for responsive correlate graph
Ref: https://www.highcharts.com/forum/viewtopic.php?t=25780
 */
div.highcharts-container {
  width: 100% !important;
  height: 100% !important;
}
svg.highcharts-root {
  width: 100%;
  height: 100%;
}
</style>
