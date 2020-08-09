<!-- Reference implementation for line graph -->
<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(cfDataRow['id'])"
      >C</el-button
    >
    <el-button
      v-if="daIsDataFldsOfRowsSame !== true"
      type="success"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfSendSubmitEvent()"
      >S</el-button
    >
    <el-button
      v-if="daIsDataFldsOfRowsSame !== true"
      type="danger"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfSendResetFormEvent()"
      >R</el-button
    >
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import mxTable from '../table-mixin.js'
import orm from '../db/orm.js'

export default {
  components: {
    highcharts: Chart,
  },
  mixins: [mxTable],
  props: {
    formType: {
      default: 'stand-alone',
      type: String,
    },
  },
  computed: {
    chartOptions() {
      const arDataToShowOnGraph = this.mfGetDataForGraph()

      if (!arDataToShowOnGraph) return {} // need to return object. If I return null I get an error.

      console.log(arDataToShowOnGraph)

      // Ref: https://www.tutorialspoint.com/highcharts/highcharts_spline_time.htm
      const chartOptions = {
        series: [
          {
            name: orm.entity,
            showInLegend: false,
            data: arDataToShowOnGraph,
          },
        ],
        title: false, // Reason: Y axis will have orm.entity for e.g. "weight" written beside it. This is small space. Difficult design decisions need to be made instead of doing everything.
        xAxis: [
          {
            title: {
              text: 'Measurement date',
            },
            type: 'datetime',
            labels: {
              enabled: 'true',
              format: '{value:%m-%Y}', // X axis now shows year and month
            },
          },
        ],
        yAxis: [
          {
            title: {
              text: orm.entity,
            },
          },
        ],
        tooltip: {
          headerFormat: '<b>{point.y:.2f} lbs</b><br>',
          pointFormat: '{point.x:%m-%Y}', // TODO: Instead of month number need to show month short form.
        },
        credits: {
          enabled: false,
        },
      } // finished defining chartOptions
      return chartOptions
    },
  },
  methods: {
    mfGetDataForGraph() {
      const arDataToShowOnGraph = []
      const data = orm.all()
      const numberOfPointsOnGraph = data.length
      if (numberOfPointsOnGraph > 0) {
        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          /* Why do I need to multiply unix timestamps by 1000 in JavaScript?
            Javascript uses milliseconds internally, while normal UNIX timestamps are usually in seconds.
            This value is taking the following path to arrive here:
            mariaDB -> field type dateTime -> vuex-orm field type number -> graph
            Ref: emr/ptclient/cts/spi/1t-1rMf/name/db/orm.js read notes beside ROW_END
          */
          const dateOfMeasurement = data[i].dateOfMeasurement * 1000
          arDataToShowOnGraph.push([dateOfMeasurement, data[i].weightInPounds])
        }
        return arDataToShowOnGraph
      } else {
        return null
      }
    },
  },
}
</script>
