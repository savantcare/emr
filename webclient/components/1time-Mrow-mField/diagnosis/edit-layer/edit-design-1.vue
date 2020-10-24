<template>
  <div>
    <el-input placeholder="Filter text" v-model="userTypedKeyword" />
    <div style="padding-top: 5px">
      <el-table
        :data="cfGetMasterListOfDiagnosis"
        :show-header="false"
        :row-class-name="fnRowToggleClass"
        height="300"
        @row-click="fnSelectionToggle"
        style="width: 100%"
      >
        <el-table-column prop="diagnosisName"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import clientSideTblPatientDiagnosis from '../db/client-side/structure/patient-table-of-diagnosis'
import clientSideTblMasterDiagnosis from '../db/client-side/structure/master-table-of-diagnosis'

export default {
  props: ['firstProp'],
  data() {
    return {
      dnOrmIdOfRowToChange: this.firstProp,
      userTypedKeyword: '',
    }
  },
  computed: {
    cfGetMasterListOfDiagnosis: function () {
      let arOfObjectsFromClientMasterDB = clientSideTblMasterDiagnosis
        .query()
        .with('linkWithPatient')
        .where('ROW_END', 2147483648000)
        .where((_record, query) => {
          query.where('diagnosisName', (value) => value.toLowerCase().includes(this.userTypedKeyword.toLowerCase()))
        })
        .orderBy('priority', 'desc')
        .get()
      return arOfObjectsFromClientMasterDB
    },
  },
  mounted() {
    this.fnSetMasterDataPriority()
  },
  methods: {
    fnSetMasterDataPriority() {
      const checkselectedData = clientSideTblMasterDiagnosis
        .query()
        .with('linkWithPatient')
        .where('ROW_END', 2147483648000)
        .get()
      if (checkselectedData.length > 0) {
        for (let index = 0; index < checkselectedData.length; index++) {
          const element = checkselectedData[index]
          if (element.linkWithPatient != null) {
            clientSideTblMasterDiagnosis.update({
              where: element.masterDiagnosisId,
              data: {
                priority: 1,
              },
            })
          } else {
            clientSideTblMasterDiagnosis.update({
              where: element.masterDiagnosisId,
              data: {
                priority: 0,
              },
            })
          }
        }
      }
    },
    fnCheckExistsDiagnosis(masterDiagnosisId) {
      return clientSideTblPatientDiagnosis
        .query()
        .where('masterDiagnosisId', masterDiagnosisId)
        .where('ROW_END', 2147483648000)
        .get()
    },
    fnSelectionToggle(rowData) {
      let masterDiagnosisId = rowData.masterDiagnosisId
      const exists = this.fnCheckExistsDiagnosis(masterDiagnosisId)
      if (exists.length > 0) {
        clientSideTblPatientDiagnosis.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            ROW_END: Math.floor(Date.now()),
          },
        })
      } else {
        clientSideTblPatientDiagnosis.insert({
          data: {
            masterDiagnosisId: masterDiagnosisId,
            patientUuid: 1,
          },
        })
      }
    },
    fnRowToggleClass(prData) {
      let masterDiagnosisId = prData.row.masterDiagnosisId
      const exists = this.fnCheckExistsDiagnosis(masterDiagnosisId)
      if (exists.length > 0) {
        return 'row-selected-success'
      }
      return ''
    },
  },
}
</script>
<style>
.row-selected-success {
  background-color: #409eff !important;
  color: #fff !important;
}
.row-selected-success:hover {
  color: #409eff !important;
  font-weight: bold;
}
</style>
