<template>
  <div>
    <el-button round type="primary" size="mini" @click="handleClickOnSettingsIcon">Correlate</el-button>
    <el-dialog title="Correlate" :visible.sync="dIsSettingsDialogVisible" width="100%" top="5vh">
      <div slot="header" class="s-css-class-outer-most-card-header clearfix">
        <div style="display: grid; grid-template-columns: 1fr 5fr">
          <tags-input
            element-id="tags"
            v-model="selectedSeriesTags"
            :existing-tags="availableSeriesTags"
            :typeahead="true"
            :typeahead-activation-threshold="0"
            :typeahead-hide-discard="true"
            :only-existing-tags="true"
            @tag-added="mfTagAdded"
            :placeholder="cfGetPlaceholder"
          ></tags-input>
        </div>
      </div>
      <highcharts :options="cfChartOptions"></highcharts>
    </el-dialog>
  </div>
</template>

<script>
import clientTblOfPatientServiceStatements from '@/components/patient-data/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

import clientTblOfPatientReminders from '@/components/patient-data/reminders/db/client-side/structure/reminders-of-a-patient-table.js'

import clientTblOfExamination from '@/components/patient-data/examination/db/client-side/structure/examination-of-a-patient-table.js'

// For pros
import clientTblOfMasterPsychReviewOfSystems from '@/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-all-select-options.js'
import clientTblOfPatientPsychReviewOfSystems from '@/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'

import clientTblOfAppointments from '@/components/patient-data/appointments/db/client-side/structure/appointment-client-side-table.js'

import allPatientDataTbls from '@/components/non-temporal/form-manager/all-client-tables.js'
import allFormDefs from '@/components/non-temporal/form-manager/all-form-definations.js'

import { Chart } from 'highcharts-vue'

export default {
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      dynamicallyAddedSeries: {},
      selectedSeriesTags: [],
      availableSeriesTags: [],
      dIsSettingsDialogVisible: false,
    }
  },
  computed: {
    cfGetPlaceholder() {
      const numberOfSeriesAvailable = this.availableSeriesTags.length - this.selectedSeriesTags.length

      if (this.availableSeriesTags.length === 0) {
        return 'No time series available'
      } else if (this.selectedSeriesTags.length === 0) {
        return numberOfSeriesAvailable + ' time series available'
      } else if (numberOfSeriesAvailable === 0) {
        return 'No more time series available'
      }
      return numberOfSeriesAvailable + ' more' //
    },
    cfChartOptions() {
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

        series: [],
        chart: {
          width: 720, // on page load default width should be 50% of page width, ie; 700px. We have developed this software to run on 1440*900
          zoomType: 'x',
        },
      }

      chart.credits = {
        enabled: false,
      }

      for (const table in allPatientDataTbls) {
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

      let timeOfMeasurementInMilliSecs = 0

      for (let i = 0; i < arOfApts.length; i++) {
        let depressionScore = this.mfGetProsOnApptLockDate(arOfApts[i])
        if (!depressionScore) continue
        let graphData = (depressionScore / maxValue) * 100
        if (arOfApts[i]['ROW_END'] === 2147483648000) {
          // This means it is current data
          timeOfMeasurementInMilliSecs = Math.floor(Date.now())
        } else {
          timeOfMeasurementInMilliSecs = arOfApts[i]['ROW_END']
        }
        graphData = Math.round(graphData)
        arDataToShowOnGraph.push([timeOfMeasurementInMilliSecs, graphData])
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
        const timeOfMeasurementInMilliSecs = arOfObjectsFromClientDB[i].ROW_START

        arDataToShowOnGraph.push({
          x: timeOfMeasurementInMilliSecs,
          y: 50,
          tooltip:
            arOfObjectsFromClientDB[i].tblLinkToServiceStatementFieldMaster.fieldNameInDb +
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
    cfArOfExaminationForDisplay() {
      const arOfObjectsFromClientDB = clientTblOfExamination
        .query()
        .with('tblExaminationMasterLink')
        .where('ROW_END', 2147483648000)
        .get()
      const data = [10, 10, 10]
      return data
    },
  },
  methods: {
    handleClickOnSettingsIcon() {
      this.dIsSettingsDialogVisible = true
    },
    handleChange(val) {},

    mfCreateSeries(pTableName) {
      // All the 3 conditions are applied sequentially
      if (
        allFormDefs[pTableName] &&
        allFormDefs[pTableName]['graphObj'] &&
        allFormDefs[pTableName]['graphObj'].series
      ) {
        // Goal : Insert object into the series array. Series array is used by highcharts

        let firstTag = null

        // There can be multiple series inside a table.
        for (let i = 0; i < allFormDefs[pTableName]['graphObj'].series.length; i++) {
          const fieldName = allFormDefs[pTableName]['graphObj'].series[i].fieldName

          // There are 2 possibilities this fieldname has been selected in the tag or not.
          // Goal: Only show those series that have been selected in the tag system

          let tagAndFieldNameAreSame = false
          if (this.selectedSeriesTags) {
            for (let i = 0; i < this.selectedSeriesTags.length; i++) {
              if (fieldName === this.selectedSeriesTags[i].key) {
                tagAndFieldNameAreSame = true
              }
            }
          }

          const seriesData = this.mfGetDataForGraph(pTableName, fieldName)
          if (seriesData && seriesData.length > 0) {
            let seriesObj = {
              name: fieldName,
              data: seriesData,
              visible: tagAndFieldNameAreSame,
              showInLegend: false,
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
      this.availableSeriesTags = []
      for (const property in this.dynamicallyAddedSeries) {
        this.availableSeriesTags.push({ key: property, value: property })
      }
      console.log(this.availableSeriesTags)
      console.log(this.selectedSeriesTags)
    },

    mfTagAdded(pTagSlug) {
      // debugger
      this.dynamicallyAddedSeries[pTagSlug.key].visible = true
      this.dynamicallyAddedSeries[pTagSlug.key].showInLegend = true
    },

    mfGetDataForGraph(pTableName, pFieldName) {
      // Step 2/2 : Get the data for the graph
      const arDataToShowOnGraph = []
      const data = allPatientDataTbls[pTableName].all() // .all is built into vuex-orm and will return all records
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
          const timeOfMeasurementInMilliSecs = data[i].timeOfMeasurementInMilliSecs
          const graphData = (data[i][pFieldName] / maxGraphData) * 100
          graphData = Math.round(graphData)
          arDataToShowOnGraph.push([timeOfMeasurementInMilliSecs, graphData])
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

.s-css-class-outer-most-card .el-card__header {
  /* Goal: Manage Distance from border to content in header*/
  padding: 0.1rem !important;
}

/* Every card in element.io has the class .el-card__body so .el-card__body is not explicitly applied. */
.s-css-class-outer-most-card .el-card__body {
  /* Goal: Manage  Distance from border to content in body*/
  padding: 0.5rem !important;
}

/* Generation Level 2. This is Gen Level 2 since card has a header. Card is Gen 1 and Header is Gen 2. */

/* Goal: The font of the header of the outer most card should be 1.2 of the font size of the browser */
.s-css-class-outer-most-card-header {
}
</style>
