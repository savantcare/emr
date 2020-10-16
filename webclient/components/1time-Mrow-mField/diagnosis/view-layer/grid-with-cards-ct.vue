<template>
  <showContentInCardComponent
    propMainCardName="Diagnosis"
    propGridDesignTopMostParentBody="diagnosi"
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
    ]">
    <div slot="bodySlotContentFromParentToShowAboveChildCards">
      <div class="diagnosis body">
        <div v-if="cfArOfDiagnosisForDisplay.length > 0">
          <el-table :data="cfArOfDiagnosisForDisplay" 
            ref="table"
            :show-header="false" 
            style="width: 100%"
            :row-class-name="tableRowClassName"
            :default-expand-all="defaultExpandAll">
            
            <el-table-column type="expand" style="padding: 5px 15px" :width="25">
              <template slot-scope="props">
                <p>
                  <span v-if="props.row.assessment != ''">{{ props.row.assessment }}</span>
                  <span v-else class="emptyRow"> Assessment empty!</span>
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="linkWithMaster.diagnosisName"> </el-table-column>
            <!-- <el-table-column prop="startDate" width="110"> </el-table-column> -->
            <el-table-column :width="115">
              <div slot-scope="{row}" class="td-number">
                {{fnFormatDateOfStartDate(row.startDate)}}
              </div>
            </el-table-column>
            <el-table-column label="Actions" :align="'right'" :width="50">
              <template slot-scope="props">
                <el-tooltip content="Delete" effect="light" :open-delay="300" placement="top">
                  <el-button
                    style="padding: 3px"
                    plain
                    tabindex="-1"
                    @click="mfIconDeleteClickedOnChildCard(props.row.$id)"
                    class="el-icon-document-delete"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else class="emptyRow">Not added yet</div>
      </div>
    </div>
  </showContentInCardComponent>
</template>

<script>
import moment from 'moment'
import showContentInCardComponent from '@/components/non-temporal/display-manager/show-content-in-card-component.vue'
import clientSideTblPatientDiagnosis from '../db/client-side/structure/patient-table-of-diagnosis'
import clientSideTblMasterDiagnosis from '../db/client-side/structure/master-table-of-diagnosis'

export default {
  components: { showContentInCardComponent },
  data() {
    return {
      defaultExpandAll: true,
    }
  },
  computed: {
    cfArOfDiagnosisForDisplay: function () {
      const getData = clientSideTblPatientDiagnosis
        .query()
        .with('linkWithMaster')
        .where('ROW_END', 2147483648000)
        .where('masterDiagnosisId', (value) => value > 0)
        .get()
      return getData
    },
  },
  methods: {
    fnFormatDateOfStartDate(time) {
      return moment(time).format(
        'MMM DD YYYY'
      )
    },

    tableRowClassName({row, rowIndex}) {
      if (row.vnRowStateInSession === 24) {
        return 'warning-row';
      } else if (row.vnRowStateInSession === 2456 || row.vnRowStateInSession === 24578) {
        return 'danger-row';
      }
      return '';
    },
    mfIconDeleteClickedOnChildCard(id) {
      const arResultsFromOrm = clientSideTblPatientDiagnosis
        .query()
        .with('linkWithMaster')
        .where(id)
        .first()
      let arStateInSession = [24, 2456, 24578];
      if(arStateInSession.includes(arResultsFromOrm.vnRowStateInSession)) {
        clientSideTblPatientDiagnosis.update({
          where: id,
          data: {
            vnRowStateInSession: null,
            ROW_END: Math.floor(Date.now()),
          },
        })
        clientSideTblMasterDiagnosis.update({
            where: (record) =>
              record.masterDiagnosisId === arResultsFromOrm.linkWithMaster.masterDiagnosisId,
            data: {
              isAssignedToPatient: false
            },
        })
        return false;
      }
      this.$prompt(arResultsFromOrm.linkWithMaster.diagnosisName, 'Delete diagnosis', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        inputPlaceholder: 'Enter reasen',
      })
        .then(async ({ value }) => {
          const status = await clientSideTblPatientDiagnosis.fnSendDeleteDataToServer(
            id,
            arResultsFromOrm.serverSideRowUuid,
            value
          )
          if (status === 1) {
            await clientSideTblMasterDiagnosis.update({
              where: (record) =>
                record.masterDiagnosisId === arResultsFromOrm.linkWithMaster.masterDiagnosisId,
              data: {
                isAssignedToPatient: false
              },
            })
            this.$message({
              type: 'success',
              message: 'Diagnosis deleted.',
            })
          } else {
            this.$message({
              type: 'error',
              message: 'Something went wrong. Please try again later.',
            })
          }
        })
        .catch(() => {
          console.log('Delete cancelled')
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
<style>
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .danger-row {
    background: #ffdcdc;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
  .emptyRow {
    color: #b1b1b1;
  }
</style>
