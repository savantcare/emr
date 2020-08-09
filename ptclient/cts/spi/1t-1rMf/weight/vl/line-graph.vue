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
import mxLineG from '../line-graph-mixin.js'

export default {
  components: {
    highcharts: Chart,
  },
  mixins: [mxTable, mxLineG],
  props: {
    formType: {
      default: 'stand-alone',
      type: String,
    },
  },
  methods: {
    mfGetDataForGraph() {
      const arDataToShowOnGraph = []
      const data = orm.all()
      const numberOfPointsOnGraph = data.length
      if (numberOfPointsOnGraph > 0) {
        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          const timeOfMeasurement = data[i].timeOfMeasurement
          const weight = data[i][orm.graphSeries1FieldName]
          arDataToShowOnGraph.push([timeOfMeasurement, weight])
        }
        return arDataToShowOnGraph
      } else {
        return null
      }
    },
  },
}
</script>
