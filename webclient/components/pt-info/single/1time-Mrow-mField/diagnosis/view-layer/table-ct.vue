<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <strong>Diagnosis</strong>
        <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="mfOpenAddModule"
          >A</el-button
        > -->
        <el-tooltip content="Add diagnosis"
                    effect="light"
                    :open-delay="100"
                    placement="top">
            <el-button style="float: right; padding: 3px 0" type="text" @click="mfOpenAddModule" icon="el-icon-circle-plus-outline"></el-button>
        </el-tooltip>
      </div>
      <div class="">
        <div v-if="bindDisplayData.length > 0">
          <el-table
            :data="bindDisplayData"
            :show-header="false"
            style="width: 100%">
            <!-- <el-table-column type="expand" v-if="assesment">
              <template slot-scope="props">
                <p><span>Assesment:</span> <span>{{ props.row.assesment }}</span></p>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="linkWithMaster.diagnosisName">
            </el-table-column>
            <el-table-column label="Actions" width="28">
              <template slot-scope="props">
                <el-tooltip content="Discontinue"
                    effect="light"
                    :open-delay="100"
                    placement="top">
                    
                  <el-button
                    type="danger"
                    size="mini"
                    style="padding: 3px"
                    plain
                    tabindex="-1"
                    @click="mfDiscontinue(props.row.$id)"
                  >D</el-button>

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

import clientSideTblPatientDiagnosis from '../db/client-side/structure/patient-of-diagnosis-table'

export default {
  computed: { 
    bindDisplayData: function() {
      const getData = clientSideTblPatientDiagnosis
        .query()
        .with('linkWithMaster')
        .where('ROW_END', 2147483647.999999)
        .get();
      return getData;
    },
   },
  methods: {
    mfDiscontinue(id) {
      const arResultsFromOrm = clientSideTblPatientDiagnosis.query().with('linkWithMaster').where(id).first();

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
              ROW_END: Math.floor(Date.now() / 1000),
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
    mfOpenAddModule() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
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
