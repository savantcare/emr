<template>
  <div>
    <tags-input
      element-id="tags"
      v-model="selectedTags"
      :existing-tags="tags"
      :typeahead="true"
      :typeahead-activation-threshold="0"
      :typeahead-hide-discard="true"
      :only-existing-tags="true"
    ></tags-input>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import clientTblOfPatientServiceStatements from '@/components/temporal/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

import clientTblOfPatientReminders from '@/components/temporal/reminders/db/client-side/structure/reminders-of-a-patient-table.js'

import clientTblOfMentalStatusExam from '@/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-of-a-patient-table.js'

import clientTblWeight from '@/components/temporal/weight/db/client-side/structure/weight-of-a-patient-table.js'
import clientTblHeight from '@/components/temporal/height/db/client-side/structure/height-of-a-patient-table.js'
import clientTblOxygenSaturation from '@/components/temporal/oxygen-saturation/db/client-side/structure/oxygen-saturation-of-a-patient-table.js'

// For pros
import clientTblOfMasterPsychReviewOfSystems from '@/components/temporal/psych-review-of-system/db/client-side/structure/psych-review-of-system-all-select-options.js'
import clientTblOfPatientPsychReviewOfSystems from '@/components/temporal/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'

import clientTblOfAppointments from '@/components/temporal/appointments/db/client-side/structure/appointment-client-side-table.js'

import allClientTbls from '@/components/def-processors/all-client-tables.js'
import allFormDefinations from '@/components/def-processors/all-form-definations.js'

import { Chart } from 'highcharts-vue'

export default {
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      dynamicallyAddedSeries: {},
      selectedTags: [],
      tags: [],
    }
  },
  computed: {
    chartOptions() {
      var chart = {
        xAxis: [
          {
            title: {
              text: 'Measured on',
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
        }, // Reason: Y axis will have clientTbl.entity for e.g. "weight" written beside it. This is small space. Difficult design decisions need to be made instead of doing everything.

        series: [
          // { data: this.cfBasicConcept, name: 'Basic concept' },
          // { data: [0, 0, 0], name: 'Appointments' },
          // { data: this.cfArOfRemindersForDisplay, name: 'Reminders' },
          // { data: this.cfGetHeightDataForGraph, name: 'Height' },
          {
            name: 'pros: depression',
            data: this.cfGetProsDepressionDataForGraph,
            events: {
              // if point gets clicked, it'll be deleted Ref: https://stackoverflow.com/questions/27189644/hiding-points-in-highcharts-on-click
              click: function (event) {
                var pointId = event.point.x
                event.point.remove()
              },
            },
            dashStyle: 'shortdot',
            tooltip: {
              headerFormat: '<small>PROS Depression: {point.key}</small><br>',
              pointFormatter: function () {
                return this.y + '% of max</b>'
              },
            },
          },
          /*
          {
            name: 'service statements',
            data: this.cfArOfServiceStatementsForGraph,
            events: {
              // if point gets clicked, it'll be deleted Ref: https://stackoverflow.com/questions/27189644/hiding-points-in-highcharts-on-click
              click: function (event) {
                var pointId = event.point.x
                event.point.remove()
              },
            },
            dashStyle: 'shortdot',
            tooltip: {
              headerFormat: '<small>Service statement: {point.key}</small><br>',
              pointFormatter: function () {
                // console.log(this) // To see , what data you can access
                return this.tooltip
              },
            },
          },

*/
        ],
        chart: {
          width: 720, // on page load default width should be 50% of page width, ie; 700px. We have developed this software to run on 1440*900
          zoomType: 'x',
        },
      }

      chart.credits = {
        enabled: false,
      }

      for (const table in allClientTbls) {
        this.mfCreateSeries(table)
      }

      for (var property in this.dynamicallyAddedSeries) {
        chart.series.push(this.dynamicallyAddedSeries[property])
      }

      return chart
    },

    cfGetProsDepressionDataForGraph() {
      // Where clause  needs to change to not reviewed time
      // Also need to run it for everytime the note has been reviewed

      // Goal: Find all times in the appt table when the appt was locked.

      const arOfApts = clientTblOfAppointments
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

    cfArOfServiceStatementsForGraph() {
      const arOfObjectsFromClientDB = clientTblOfPatientServiceStatements
        .query()
        .with('tblLinkToServiceStatementFieldMaster')
        .where('ROW_END', 2147483648000)
        .get()

      const arDataToShowOnGraph = []

      for (let i = 0; i < arOfObjectsFromClientDB.length; i++) {
        const timeOfMeasurementInMilliseconds = arOfObjectsFromClientDB[i].ROW_START

        arDataToShowOnGraph.push({
          x: timeOfMeasurementInMilliseconds,
          y: 50,
          tooltip:
            arOfObjectsFromClientDB[i].tblLinkToServiceStatementFieldMaster.serviceStatementFieldNameInDb +
            ' ' +
            arOfObjectsFromClientDB[i].tblLinkToServiceStatementFieldMaster.serviceStatementDescription,
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
      const arOfObjectsFromClientDB = clientTblOfPatientReminders.query().where('ROW_END', 2147483648000).get()

      var arDataToShowOnGraph = new Array()

      for (let i = 0; i < arOfObjectsFromClientDB.length; i++) {
        arDataToShowOnGraph.push([arOfObjectsFromClientDB[i].ROW_START, 0])
      }

      return arDataToShowOnGraph
    },
    cfArOfMentalStatusExamForDisplay() {
      const arOfObjectsFromClientDB = clientTblOfMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .where('ROW_END', 2147483648000)
        .get()
      const data = [10, 10, 10]
      return data
    },
  },
  methods: {
    mfGetProsOnApptLockDate(pApptObj) {
      /*
      if (!pApptObj) return

      let arOfObjectsFromClientRos = []
      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientRos = clientTblOfPatientPsychReviewOfSystems
          .query()
          .with('tblPsychReviewOfSystemsMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientRos = clientTblOfPatientPsychReviewOfSystems
          .query()
          .with('tblPsychReviewOfSystemsMasterLink')
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }

      let groupTotal = []
      let catName = ''
      let value = 0
      for (let i = 0; i < arOfObjectsFromClientRos.length; i++) {
        catName = arOfObjectsFromClientRos[i]['tblPsychReviewOfSystemsMasterLink']['psychReviewOfSystemsCategory']
        if (!groupTotal[catName]) groupTotal[catName] = 0
        if (arOfObjectsFromClientRos[i]['psychReviewOfSystemsFieldValue'] !== null) {
          value = arOfObjectsFromClientRos[i]['psychReviewOfSystemsFieldValue']
          groupTotal[catName] = parseFloat(groupTotal[catName]) + parseFloat(value)
        }
      }
      return groupTotal['Depression']
      */
    },

    mfCreateSeries(pTableName) {
      // All the 3 conditions are applied sequentially
      if (
        allFormDefinations[pTableName] &&
        allFormDefinations[pTableName]['graphObj'] &&
        allFormDefinations[pTableName]['graphObj'].series
      ) {
        // Goal : Insert object into the series array. Series array is used by highcharts

        //debugger
        for (let i = 0; i < allFormDefinations[pTableName]['graphObj'].series.length; i++) {
          const fieldName = allFormDefinations[pTableName]['graphObj'].series[i].fieldName
          const seriesData = this.mfGetDataForGraph(pTableName, fieldName)
          if (seriesData && seriesData.length > 0) {
            let seriesObj = {
              name: fieldName,
              data: seriesData,
              events: {
                // if point gets clicked, it'll be deleted Ref: https://stackoverflow.com/questions/27189644/hiding-points-in-highcharts-on-click
                click: function (event) {
                  var pointId = event.point.x
                  event.point.remove()
                },
              },
              dashStyle: 'longdash',
              tooltip: {
                headerFormat: '<small>' + fieldName + ': {point.key}</small><br>',
                pointFormatter: function () {
                  return this.y + '% of max</b>'
                },
              },
            }
            this.dynamicallyAddedSeries[fieldName] = seriesObj
            this.mfSetTags()
          }
        }
      }
    },
    mfSetTags() {
      this.tags = []
      for (const property in this.dynamicallyAddedSeries) {
        this.tags.push({ key: property, value: property })
      }
      console.log(this.tags)
    },

    mfGetDataForGraph(pTableName, pFieldName) {
      // Step 2/2 : Get the data for the graph
      const arDataToShowOnGraph = []
      const data = allClientTbls[pTableName].all() // .all is built into vuex-orm and will return all records
      const numberOfPointsOnGraph = data.length
      if (numberOfPointsOnGraph > 0) {
        // Goal: Find the max value. So percentage can be made.
        let maxGraphData = 0
        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          const graphData = data[i][pFieldName]
          if (graphData > maxGraphData) {
            maxGraphData = graphData
          }
        }

        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          const timeOfMeasurementInMilliseconds = data[i].timeOfMeasurementInMilliseconds
          const graphData = (data[i][pFieldName] / maxGraphData) * 100
          graphData = Math.round(graphData)
          arDataToShowOnGraph.push([timeOfMeasurementInMilliseconds, graphData])
        }

        return arDataToShowOnGraph
      } else {
        return null
      }
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
