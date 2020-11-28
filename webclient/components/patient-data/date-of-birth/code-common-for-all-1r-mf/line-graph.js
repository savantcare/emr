import { Chart } from 'highcharts-vue'
import clientTbl from '../db/client-side/structure/table.js'
import mxViewLayer from './view-layer.js'

export default {
  components: {
    highcharts: Chart,
  },
  mixins: [mxViewLayer],
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

      // console.log(arDataToShowOnGraph)

      // Ref: https://www.tutorialspoint.com/highcharts/highcharts_spline_time.htm
      const chartOptions = {
        series: [
          {
            name: clientTbl.entity,
            showInLegend: false,
            data: arDataToShowOnGraph,
          },
        ],
        title: {
          text: '',
        }, // Reason: Y axis will have clientTbl.entity for e.g. "weight" written beside it. This is small space. Difficult design decisions need to be made instead of doing everything.
        chart: {
          height: 200,
        },
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
        yAxis: [
          {
            title: {
              text: clientTbl.entity,
            },
          },
        ],
        tooltip: {
          headerFormat: '<b>{point.y:.2f} ' + clientTbl.graphSeries1Unit + '</b><br>',
          pointFormat: '{point.x:%m-%Y}',
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
      const data = clientTbl.all()
      const numberOfPointsOnGraph = data.length
      if (numberOfPointsOnGraph > 0) {
        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          const timeOfMeasurementInMilliSecs = data[i].timeOfMeasurementInMilliSecs
          const graphData = data[i][clientTbl.graphSeries1FieldName]
          arDataToShowOnGraph.push([timeOfMeasurementInMilliSecs, graphData])
        }
        return arDataToShowOnGraph
      } else {
        return null
      }
    },
  },
}
