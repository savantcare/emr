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
        arWeight.push(data[i].weightInPounds)
      }
      console.log(arWeight)
      const chartOptions = {
        series: [
          {
            showInLegend: false,
            data: arWeight,
          },
        ],
        title: false, // Reason: Y axis will have "weight"

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
