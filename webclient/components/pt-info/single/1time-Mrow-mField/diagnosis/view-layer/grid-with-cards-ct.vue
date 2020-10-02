<template>
  <showContentInCardComponent
    propMainCardName="Diagnosis"
    :propActionsThatCanBeInvokedFromCardHeader="[
      {
        actionDescription: 'Add',
        isDefaultAction: true,
      },
      {
        actionDescription: 'Toggle card display',
      },
      {
        actionDescription: 'Close card',
      },
    ]"
    :propClientSideRowLevelActions="[]"
  >
    <el-card slot="bodySlotContentFromParentToShowAboveChildCards" class="box-card">
        <div v-if="cfArOfDiagnosisForDisplay.length > 0">
          <el-table
            :data="cfArOfDiagnosisForDisplay"
            :show-header="false"
            style="width: 100%">
            <el-table-column
              prop="linkWithMaster.diagnosisName">
            </el-table-column>
            <el-table-column label="Actions" width="28">
              <template slot-scope="props">
                <el-tooltip content="Discontinue"
                    effect="light"
                    :open-delay="300"
                    placement="top">
                    
                  <el-button
                    type="danger"
                    size="mini"
                    style="padding: 3px"
                    plain
                    tabindex="-1"
                    @click="mfIconDeleteClickedOnChildCard(props.row.$id)"
                  >D</el-button>

                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else class="emptyRow">Not added yet</div>
    </el-card>
  </showContentInCardComponent>
</template>

<script>

import clientSideTblPatientDiagnosis from '../db/client-side/structure/patient-table-of-diagnosis'
import showContentInCardComponent from '@/components/pt-info/single/common/show-content-in-card-component.vue'

export default {
  components: { showContentInCardComponent },
  computed: { 
    cfArOfDiagnosisForDisplay: function() {
      const getData = clientSideTblPatientDiagnosis
        .query()
        .with('linkWithMaster')
        .where('ROW_END', 2147483647.999999)
        .get();
        console.log('getData', getData);
      return getData;
    },
   },
  methods: {
    mfIconDeleteClickedOnChildCard(id) {
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
    mxOpenAddCtInEditLayer() {
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
