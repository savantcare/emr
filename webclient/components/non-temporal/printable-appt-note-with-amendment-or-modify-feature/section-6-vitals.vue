<template>
  <div>
    <el-row type="flex" justify="left" class="ssh3 sectionHeader" style="padding: 0rem; margin: 0rem">
      <el-col class="sectionHeading">Vitals</el-col>
    </el-row>
    Height:
    {{ mfGetHeightData(this.currentApptObj) }} <br />Weight {{ mfGetWeightData(this.currentApptObj) }} <br />Oxygen
    Saturation
    {{ mfGetOxygenSaturationData(this.currentApptObj) }}
  </div>
</template>

<script>
import clientTblWeight from '@/components/1time-eachField-1value/vital-signs/sub-cts/weight/db/client-side/structure/table.js'
import clientTblHeight from '@/components/1time-eachField-1value/vital-signs/sub-cts/height/db/client-side/structure/table.js'
import clientTblOxygenSaturation from '@/components/1time-eachField-1value/vital-signs/sub-cts/oxygen-saturation/db/client-side/structure/table.js'
import clientTblOfAppointments from '@/components/temporal/appointments/db/client-side/structure/appointment-client-side-table.js'
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
    this.currentApptObj = await clientTblOfAppointments.find(this.propApptId)
  },
  methods: {
    mfGetHeightData(pApptObj) {
      if (!pApptObj) {
        return
      }
      if (!pApptObj[['apptStatus']]) {
        return
      }

      let arOfObjectsFromClientDB = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientDB = clientTblHeight.query().where('ROW_END', 2147483648000).get()
      } else {
        arOfObjectsFromClientDB = clientTblHeight
          .query()
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }

      if (arOfObjectsFromClientDB.length > 0) {
      } else {
        return
      }

      let arr = []
      arr[0] = moment(arOfObjectsFromClientDB[0]['timeOfMeasurementInMilliseconds']).format('MMM DD YYYY')
      arr[1] = arOfObjectsFromClientDB[0]['heightInInches']

      return arr[1] + ' inches on ' + arr[0]
    },

    mfGetWeightData(pApptObj) {
      if (!pApptObj) {
        return
      }
      if (!pApptObj[['apptStatus']]) {
        return
      }

      let arOfObjectsFromClientDB = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientDB = clientTblWeight.query().where('ROW_END', 2147483648000).get()
      } else {
        arOfObjectsFromClientDB = clientTblWeight
          .query()
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }

      if (arOfObjectsFromClientDB.length > 0) {
      } else {
        return
      }

      let arr = []
      arr[0] = moment(arOfObjectsFromClientDB[0]['timeOfMeasurementInMilliseconds']).format('MMM DD YYYY')
      arr[1] = arOfObjectsFromClientDB[0]['weightInPounds']

      return arr[1] + ' pounds on ' + arr[0]
    },

    mfGetOxygenSaturationData(pApptObj) {
      if (!pApptObj) {
        return
      }
      if (!pApptObj[['apptStatus']]) {
        return
      }

      let arOfObjectsFromClientDB = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientDB = clientTblOxygenSaturation.query().where('ROW_END', 2147483648000).get()
      } else {
        arOfObjectsFromClientDB = clientTblOxygenSaturation
          .query()
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }

      if (arOfObjectsFromClientDB.length > 0) {
      } else {
        return
      }

      let arr = []
      arr[0] = moment(arOfObjectsFromClientDB[0]['timeOfMeasurementInMilliseconds']).format('MMM DD YYYY')
      arr[1] = arOfObjectsFromClientDB[0]['oxygenSaturationInSpo2']

      return arr[1] + ' spO2 on ' + arr[0]
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
.sectionHeader {
  margin-top: 1rem !important;
  padding-bottom: 0.1rem !important;
  border-bottom: 1px solid #dcdfe6;
}
.sectionHeading {
  font-size: 1rem;
  color: #606266;
}
</style>
