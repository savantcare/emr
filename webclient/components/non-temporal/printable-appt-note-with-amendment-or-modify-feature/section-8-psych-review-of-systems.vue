<template>
  <div>
    <!-- SECTION 8 Psych review of systems  -->
    <el-row
      type="flex"
      justify="left"
      class="prosh3 sectionHeader"
      style="padding: 0rem; margin: 0rem"
    >
      <el-col :span="8" class="sectionHeading">Psych review of systems </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="isAddendumPopoverVisible">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
              <el-button
                v-if="amendmentData.length > 0"
                type="success"
                icon="el-icon-check"
                style="position: absolute; bottom: 15px; right: 15px"
                size="mini"
                @click="mfSaveAddendum(amendmentData, 'psychReviewOfSystems')"
                circle
              ></el-button>
            </div>
            <el-button
              slot="reference"
              class="el-icon-edit-outline"
              size="mini"
              style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
            ></el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>

    <div
      v-for="row in cfArOfPsychReviewOfSystemsForDisplay"
      :key="`ros - ${row.clientSideUniqRowId}`"
    >
      {{ row['tblPsychReviewOfSystemsMasterLink']['psychReviewOfSystemsCategory'] }}
      {{ row['tblPsychReviewOfSystemsMasterLink']['psychReviewOfSystemsDescription'] }}
    </div>
    <br />
    <div
      v-if="
        cfArOfAddendumForDisplay('psychReviewOfSystems') &&
        cfArOfAddendumForDisplay('psychReviewOfSystems').length > 0
      "
    >
      <h4>Addendum:</h4>
      <div
        v-for="row in cfArOfAddendumForDisplay('psychReviewOfSystems')"
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
import clientSideTblOfAddendums from '~/components/1time-Mrow-1Field/amendment/db/client-side/structure/amendment-client-side-table.js'
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientSideTblOfPsychReviewOfSystems from '@/components/1time-1row-mField/psych-review-of-systems/db/client-side/structure/patient-table-of-psych-review-of-systems.js'

export default {
  data() {
    return {
      patientCurrentApptObj: {},
      debug: false,
      amendmentData: '',
      isAddendumPopoverVisible: false,
    }
  },
  computed: {
    cfArOfAddendumForDisplay() {
      const arFromClientSideTblOfAddendums = clientSideTblOfAddendums
        .query()
        .where('appointmentId', this.propShowNoteForApptId)
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
    cfArOfPsychReviewOfSystemsForDisplay() {
      let arOfObjectsFromClientSideDB = []
      if (this.patientCurrentApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblOfPsychReviewOfSystems
          .query()
          .with('tblPsychReviewOfSystemsMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblOfPsychReviewOfSystems
          .query()
          .with('tblPsychReviewOfSystemsMasterLink')
          .where('ROW_END', (value) => value > this.patientCurrentApptObj['ROW_END'])
          .where('ROW_START', (value) => value < this.patientCurrentApptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientSideDB
    },
  },
}
</script>

<style scoped>
.mseh3:hover .el-icon-edit-outline {
  display: inline-block !important;
  position: absolute;
}
.mseh3:hover .el-icon-money {
  display: inline-block !important;
  position: absolute;
}
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
  font-weight: bold;
}
</style>
