<!-- Master doc is at reference implementation name/vl/table.vue. This file has doc unique to this ct 
Code synced with ref implementation on 4th august 2020
 -->
<template>
  <div>
    <h5 v-if="formType === 'stand-alone'">Weight</h5>
    <highcharts :options="chartOptions"></highcharts>

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
      const a = {
        series: [
          {
            data: arWeight,
          },
        ],
      }
      return a
    },
  },
}
</script>
