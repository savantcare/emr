<!-- Master doc is at reference implementation name/vl/table.vue. This file has doc unique to this ct 
Code synced with ref implementation on 4th august 2020
 -->
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
      for (let i = 0; i < data.length; i++) {
        const dateOfMeasurement = data[i].dateOfMeasurement
        arDataToShowOnGraph.push([dateOfMeasurement, data[i].weightInPounds])
      }
      return arDataToShowOnGraph
    },
  },
}
</script>
