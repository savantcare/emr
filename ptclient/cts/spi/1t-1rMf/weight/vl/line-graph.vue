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

      // if (!arDataToShowOnGraph) return {} // In this case the tooltip will not come property formatted. Since during 2nd run it is updating the data but not some of the other chartOptions

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
        title: {
          text: '',
        }, // Reason: Y axis will have orm.entity for e.g. "weight" written beside it. This is small space. Difficult design decisions need to be made instead of doing everything.
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
        yAxis: [
          {
            title: {
              text: orm.entity,
            },
          },
        ],
        tooltip: {
          headerFormat: '<b>{point.y:.2f} lbs</b><br>',
          pointFormat: '{point.x:%m-%Y}',
          /* TODO: 
          1. Instead of month number need to show month short form. 
          2. In graph sometimes the tooltip format is ok and other times not. Seems like a race condition. 
          3. json-server needs to send only 1 valid and other discontinued data.
          4. On changing the data the json-server data insert and update of old data needs to work. In mariaDB this is transparent. Should I use to MaroaDB now? 
          5. Show notes when click on popup */
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
