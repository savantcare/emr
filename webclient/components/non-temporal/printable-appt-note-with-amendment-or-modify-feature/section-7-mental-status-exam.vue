<template>
  <!-- SECTION 7 MENTAL STATUS EXAM-->
  <div>
    <el-row
      type="flex"
      justify="left"
      class="mseh3"
      style="padding-top: 20px; padding-bottom: 10px; min-height: 53px"
    >
      <el-col :span="8">
        <h3>Mental status exam</h3>
      </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <div v-if="patientCurrentApptObj['apptStatus'] === 'locked'">
            <el-popover placement="right" width="400" v-model="popoverVisible2">
              <div style="text-align: right; margin: 0">
                <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
                <el-button
                  v-if="amendmentData.length > 0"
                  type="success"
                  icon="el-icon-check"
                  style="position: absolute; bottom: 15px; right: 15px"
                  size="mini"
                  @click="mfSaveAddendum(amendmentData, 'mentalStatusExam')"
                  circle
                ></el-button>
              </div>
              <el-button
                slot="reference"
                class="el-icon-edit-outline"
                size="mini"
                style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
              >
              </el-button>
            </el-popover>
          </div>
          <div v-else>
            <el-button
              class="el-icon-money"
              size="mini"
              @click="mfOpenMultiEditCtInEditLayer"
              style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
            ></el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-for="row in cfArOfMentalStatusExamForDisplay" :key="`mse - ${row.clientSideUniqRowId}`">
      {{ row['tblMentalStatusExamMasterLink']['mentalStatusExamCategory'] }}
      {{ row['tblMentalStatusExamMasterLink']['mentalStatusExamDescription'] }}
    </div>
    <br />
    <div
      v-if="
        cfArOfAddendumForDisplay('mentalStatusExam') &&
        cfArOfAddendumForDisplay('mentalStatusExam').length > 0
      "
    >
      <h4>Addendum:</h4>
      <div
        v-for="row in cfArOfAddendumForDisplay('mentalStatusExam')"
        :key="row.clientSideUniqRowId"
      >
        <div style="margin: 5px 0">
          {{ row.description }}
          <br />
          <span style="font-size: 10px"
            >Added by {{ row.addedBy }} at {{ row.ROW_START | moment }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Data tables
import clientSideTblOfAddendums from '~/components/1time-Mrow-1Field/amendment/db/client-side/structure/amendment-client-side-table.js'
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientSideTblOfMentalStatusExam from '@/components/1time-1row-mField/mental-status-exam/db/client-side/structure/patient-table-of-mental-status-exam.js'

export default {
  data() {
    return {
      patientCurrentApptObj: [],
      debug: false,
      amendmentData: '',
      isAddendumPopoverVisible: false,
      popoverVisible2: false,
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
    console.log('== FROM MSE ==', this.propApptId)
    this.patientCurrentApptObj = await clientSideTblOfAppointments.find(this.propApptId)
    console.log(this.patientCurrentApptObj)
  },
  methods: {
    mfOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'edit mental status exam',
      })
    },
    mfSaveAddendum(pAddendumData, component) {
      clientSideTblOfAddendums.insert({
        data: {
          appointmentId: this.patientCurrentApptObj.clientSideUniqRowId,
          component: component,
          description: pAddendumData,
          ROW_START: Math.floor(Date.now()),
        },
      })

      // remove modal value after save
      this.amendmentData = ''
    },
  },
  computed: {
    cfArOfMentalStatusExamForDisplay() {
      let arOfObjectsFromClientSideDB = []
      if (this.patientCurrentApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblOfMentalStatusExam
          .query()
          .with('tblMentalStatusExamMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblOfMentalStatusExam
          .query()
          .with('tblMentalStatusExamMasterLink')
          .where('ROW_END', (value) => value > this.patientCurrentApptObj['ROW_END'])
          .where('ROW_START', (value) => value < this.patientCurrentApptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientSideDB
    },
    cfArOfAddendumForDisplay() {
      const arFromClientSideTblOfAddendums = clientSideTblOfAddendums
        .query()
        .where('appointmentId', this.propApptId)
        .orderBy('ROW_START', 'asc')
        .get()

      const arAddendums = []
      arFromClientSideTblOfAddendums.forEach((row) => {
        if (typeof arAddendums[row.component] === 'undefined') {
          arAddendums[row.component] = []
        }
        arAddendums[row.component].push(row)
      })

      /**
       * component is computed function parameter
       * ref: https://ednsquare.com/question/how-to-pass-parameters-in-computed-properties-in-vue-js-------MQVlHT
       */
      return (component) => arAddendums[`${component}`]
    },
  },
}
</script>

<style scoped>
.mseh3:hover .el-icon-edit-outline {
  display: inline-block !important;
}
.mseh3:hover .el-icon-money {
  display: inline-block !important;
}
</style>
