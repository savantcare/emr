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
      const arWeight = []
      const data = orm.all()
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].weightInPounds)
        const dateOfMeasurement = data[i].dateOfMeasurement
        arWeight.push([dateOfMeasurement, data[i].weightInPounds])
      }
      console.log(arWeight)

      // Ref: https://www.tutorialspoint.com/highcharts/highcharts_spline_time.htm
      const chartOptions = {
        series: [
          {
            name: 'Weight',
            showInLegend: false,
            data: arWeight,
          },
        ],
        title: false, // Reason: Y axis will have "weight" written beside it.
        yAxis: [
          {
            title: {
              text: 'Weight',
            },
          },
        ],

        xAxis: [
          {
            title: {
              text: 'Measurement date',
            },
            type: 'datetime',
            labels: {
              enabled: 'true',
              format: '{value:%Y-%m}', // X axis now shows year and month
            },
          },
        ],

        credits: {
          enabled: false,
        },
      } // finished defining chartOptions
      return chartOptions
    },
  },
}
</script>
