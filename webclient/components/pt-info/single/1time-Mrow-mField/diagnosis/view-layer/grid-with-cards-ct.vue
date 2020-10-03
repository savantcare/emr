<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <strong>Diagnosis</strong>
        <el-tooltip content="Add diagnosis" effect="light" :open-delay="300" placement="top">
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="fnOpenAddModule"
            icon="el-icon-circle-plus-outline"
          ></el-button>
        </el-tooltip>
      </div>
      <div class="">
        <div v-if="cfArOfDiagnosisForDisplay.length > 0">
          <el-table :data="cfArOfDiagnosisForDisplay" :show-header="false" style="width: 100%">
            <!-- <el-table-column type="expand" v-if="assesment">
              <template slot-scope="props">
                <p><span>Assesment:</span> <span>{{ props.row.assesment }}</span></p>
              </template>
            </el-table-column> -->
            <el-table-column prop="linkWithMaster.diagnosisName"> </el-table-column>
            <el-table-column label="Actions" width="28">
              <template slot-scope="props">
                <el-tooltip content="Discontinue" effect="light" :open-delay="300" placement="top">
                  <el-button
                    type="danger"
                    size="mini"
                    style="padding: 3px"
                    plain
                    tabindex="-1"
                    @click="mfIconDeleteClickedOnChildCard(props.row.$id)"
                    >D</el-button
                  >
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else class="emptyRow">Not added yet</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import clientSideTblPatientDiagnosis from '../db/client-side/structure/patient-table-of-diagnosis'

export default {
  computed: {
    cfArOfDiagnosisForDisplay: function () {
      const getData = clientSideTblPatientDiagnosis
        .query()
        .with('linkWithMaster')
        .where('ROW_END', 2147483648000)
        .get()
      return getData
    },
  },
  methods: {
    mfIconDeleteClickedOnChildCard(id) {
      const arResultsFromOrm = clientSideTblPatientDiagnosis
        .query()
        .with('linkWithMaster')
        .where(id)
        .first()

      this.$prompt(arResultsFromOrm.linkWithMaster.diagnosisName, 'Discontinue diagnosis', {
        confirmButtonText: 'Discontinue',
        cancelButtonText: 'Cancel',
        inputPlaceholder: 'Enter reasen',
      })
        .then(async ({ value }) => {
          clientSideTblPatientDiagnosis.update({
            where: id,
            data: {
              discontinueNote: value,
              ROW_END: Math.floor(Date.now()),
            },
          })
          this.$message({
            type: 'success',
            message: 'Diagnosis discontinue.',
          })
          // console.log('delete status ======> ', value)
        })
        .catch(() => {
          console.log('Discontinue cancelled')
        })
    },
    fnOpenAddModule() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'add diagnosis', //pPropsToGiveToCt: 1
      })
    },
  },
  async mounted() {},
}
</script>
<style scoped>
.emptyRow {
  color: #b1b1b1;
}
</style>
