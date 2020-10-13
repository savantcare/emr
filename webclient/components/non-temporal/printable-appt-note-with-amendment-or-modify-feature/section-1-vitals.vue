<template>
  <div>
    <h3>Vitals</h3>
    Height {{ mfGetHeightData() }} Weight {{ mfGetWeightData() }} Oxygen Saturation
    {{ mfGetOxygenSaturationData() }}
  </div>
</template>

<script>
import clientSideTblWeight from '@/components/1time-1row-mField/vital-signs/sub-cts/weight/db/client-side/structure/table.js'
import clientSideTblHeight from '@/components/1time-1row-mField/vital-signs/sub-cts/height/db/client-side/structure/table.js'
import clientSideTblOxygenSaturation from '@/components/1time-1row-mField/vital-signs/sub-cts/oxygen-saturation/db/client-side/structure/table.js'

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
    mfGetHeightData() {
      const arDataToShow = []
      const data = clientSideTblHeight.all()
      const numberOfPoints = data.length
      if (numberOfPoints > 0) {
        for (let i = 0; i < numberOfPoints; i++) {
          const timeOfMeasurementInMilliseconds = data[i].timeOfMeasurementInMilliseconds
          const graphData = data[i][clientSideTblHeight.graphSeries1FieldName]
          arDataToShow.push([timeOfMeasurementInMilliseconds, graphData])
        }
        // console.log(arDataToShow)
        return arDataToShow
      } else {
        return null
      }
    },

    mfGetWeightData() {
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

    mfGetOxygenSaturationData() {
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

<style scoped></style>
