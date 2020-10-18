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
        return
      }
      if (!pApptObj[['apptStatus']]) {
        return
      }

      let arOfObjectsFromClientSideDB = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblHeight.query().where('ROW_END', 2147483648000).get()
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
      arr[0] = moment(arOfObjectsFromClientSideDB[0]['timeOfMeasurementInMilliseconds']).format('MMM DD YYYY')
      arr[1] = arOfObjectsFromClientSideDB[0]['heightInInches']

      return arr[1] + ' inches on ' + arr[0]
    },

    mfGetWeightData(pApptObj) {
      if (!pApptObj) {
        return
      }
      if (!pApptObj[['apptStatus']]) {
        return
      }

      let arOfObjectsFromClientSideDB = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblWeight.query().where('ROW_END', 2147483648000).get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblWeight
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
      arr[0] = moment(arOfObjectsFromClientSideDB[0]['timeOfMeasurementInMilliseconds']).format('MMM DD YYYY')
      arr[1] = arOfObjectsFromClientSideDB[0]['weightInPounds']

      return arr[1] + ' pounds on ' + arr[0]
    },

    mfGetOxygenSaturationData(pApptObj) {
      if (!pApptObj) {
        return
      }
      if (!pApptObj[['apptStatus']]) {
        return
      }

      let arOfObjectsFromClientSideDB = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblOxygenSaturation.query().where('ROW_END', 2147483648000).get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblOxygenSaturation
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
      arr[0] = moment(arOfObjectsFromClientSideDB[0]['timeOfMeasurementInMilliseconds']).format('MMM DD YYYY')
      arr[1] = arOfObjectsFromClientSideDB[0]['oxygenSaturationInSpo2']

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
