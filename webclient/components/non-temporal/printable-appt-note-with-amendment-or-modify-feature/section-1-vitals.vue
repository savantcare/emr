<template>
  <div>
    <h3>Vitals</h3>
    Height:
    {{ mfGetHeightData(this.currentApptObj) }} <br />Weight
    {{ mfGetWeightData(this.currentApptObj) }} <br />Oxygen Saturation
    {{ mfGetOxygenSaturationData(this.currentApptObj) }}
  </div>
</template>

<script>
import clientSideTblWeight from '@/components/1time-1row-mField/vital-signs/sub-cts/weight/db/client-side/structure/table.js'
import clientSideTblHeight from '@/components/1time-1row-mField/vital-signs/sub-cts/height/db/client-side/structure/table.js'
import clientSideTblOxygenSaturation from '@/components/1time-1row-mField/vital-signs/sub-cts/oxygen-saturation/db/client-side/structure/table.js'
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'
import moment from 'moment'

export default {
  data() {
    return {
      currentApptObj: [],
    }
  },
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
  },
  async mounted() {
    if (!this.propApptId === 0) {
      return
    }
    this.currentApptObj = await clientSideTblOfAppointments.find(this.propApptId)
  },
  methods: {
    mfGetHeightData(pApptObj) {
      if (!pApptObj) {
        console.log('no valid param')
        return
      }
      if (!pApptObj[['apptStatus']]) {
        console.log('no valid param')
        return
      }

      let arOfObjectsFromClientSideDB = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblHeight
          .query()
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblHeight
          .query()
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }

      if (arOfObjectsFromClientSideDB.length > 0) {
      } else {
        return
      }

      let arr = []
      arr[0] = moment(arOfObjectsFromClientSideDB[0]['timeOfMeasurementInMilliseconds']).format(
        'MMM DD YYYY'
      )
      arr[1] = arOfObjectsFromClientSideDB[0]['heightInInches']

      return arr[1] + ' inches on ' + arr[0]
    },

    mfGetWeightData(pApptObj) {
      const arDataToShow = []
      const data = clientSideTblWeight.all()
      const numberOfPoints = data.length
      if (numberOfPoints > 0) {
        // find the max value
        let maxGraphData = 0
        for (let i = 0; i < numberOfPoints; i++) {
          const graphData = data[i][clientSideTblWeight.graphSeries1FieldName]
          if (graphData > maxGraphData) {
            maxGraphData = graphData
          }
        }

        for (let i = 0; i < numberOfPoints; i++) {
          const timeOfMeasurementInMilliseconds = data[i].timeOfMeasurementInMilliseconds
          const graphData =
            (data[i][clientSideTblWeight.graphSeries1FieldName] / maxGraphData) * 100
          graphData = Math.round(graphData)
          arDataToShow.push([timeOfMeasurementInMilliseconds, graphData])
        }
        //console.log(arDataToShow)
        return arDataToShow
      } else {
        return null
      }
    },

    mfGetOxygenSaturationData(pApptObj) {
      const arDataToShow = []
      const data = clientSideTblOxygenSaturation.all()
      const numberOfPoints = data.length

      if (numberOfPoints > 0) {
        // find the max value
        let maxGraphData = 0
        for (let i = 0; i < numberOfPoints; i++) {
          const graphData = data[i][clientSideTblOxygenSaturation.graphSeries1FieldName]
          if (graphData > maxGraphData) {
            maxGraphData = graphData
          }
        }

        for (let i = 0; i < numberOfPoints; i++) {
          const timeOfMeasurementInMilliseconds = data[i].timeOfMeasurementInMilliseconds
          const graphData =
            (data[i][clientSideTblOxygenSaturation.graphSeries1FieldName] / maxGraphData) * 100
          graphData = Math.round(graphData)
          arDataToShow.push([timeOfMeasurementInMilliseconds, graphData])
        }
        // console.log(arDataToShow)
        return arDataToShow
      } else {
        return null
      }
    },
  },
}
</script>
<style scoped>
h3 {
  border-bottom: 1px solid #dcdfe6;
  margin-top: 1rem;
  width: 100%;
  float: none;
  display: flex;
}
</style>
