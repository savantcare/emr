import { Chart } from 'highcharts-vue'
import objOrm from '../db/table.js'
import mxViewLayer from './view-layer.js'

export default {
  components: {
    highcharts: Chart,
  },
  mixins: [mxViewLayer],
  props: {
    formType: {
      default: 'stand-alone', // sets default value of props formType to 'stand-alone'
      type: String,
    },
  },
  computed: {
    chartOptions() {
      const arDataToShowOnGraph = this.mfGetDataForGraph()
      // if (!arDataToShowOnGraph) return {}
      console.log(arDataToShowOnGraph)
      const chartOptions = {
        series: [
          {
            name: objOrm.entity,
            showInLegend: false,
            data: arDataToShowOnGraph,
          },
        ],
        title: {
          text: '',
        }, // Reason: Y axis will have objOrm.entity for e.g. "weight" written beside it. This is small space. Difficult design decisions need to be made instead of doing everything.
        chart: {
          height: 200,
        },
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
              text: objOrm.entity,
            },
          },
        ],
        tooltip: {
          headerFormat: '<b>{point.y:.2f} ' + objOrm.graphSeries1Unit + '</b><br>',
          pointFormat: '{point.x:%d-%m-%Y}',
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
      const data = objOrm.all()
      const numberOfPointsOnGraph = data.length
      console.log(data, numberOfPointsOnGraph)
      if (numberOfPointsOnGraph > 0) {
        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          /**
           * Q) Why we are fetching vnRowStateInSession data which containts '1'
           *
           * Ans) In the PHQ9 graph we shown the historal data fetched form db
           * Other unsaved data in orm is not required for graph.
           * In orm vnRowStateInSession containts '1' means the data fetched form db.
           */
          if (data[i].ROW_START !== 0 && data[i].vnRowStateInSession.toString().includes('1')) {
            const timeOfMeasurement = parseInt(data[i].ROW_START * 1000)
            const graphData = this.mfGetTotalAnswerPoint(data[i])
            arDataToShowOnGraph.push([timeOfMeasurement, graphData])
          }
        }
        return arDataToShowOnGraph
      } else {
        return null
      }
    },
    mfGetTotalAnswerPoint(data) {
      // fetch total point of phq9 question's answer for a row
      const totalPoint =
        this.mfGetIntval(data.littleInterestOrPleasureInDoingThings) +
        this.mfGetIntval(data.feelingDownDepressedOrHopeless) +
        this.mfGetIntval(data.troubleFallingOrStayingAsleep) +
        this.mfGetIntval(data.feelingTiredOrHavingLittleEnergy) +
        this.mfGetIntval(data.poorAppetiteOrOvereating) +
        this.mfGetIntval(data.feelingBadAboutYourself) +
        this.mfGetIntval(data.troubleConcentratingOnThings) +
        this.mfGetIntval(data.movingOrSpeakingSoSlowly) +
        this.mfGetIntval(data.thoughtsThatYouWouldBeBetterOffDead) +
        this.mfGetIntval(data.ifYouCheckedOffAnyProblems)
      // console.log(data, totalPoint)
      return totalPoint
    },
    mfGetIntval(dsValue) {
      const dnValue = dsValue === 'null' ? 0 : parseInt(dsValue)
      return dnValue
    },
  },
}
