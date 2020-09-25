<template>
  <div>
    <!-- <h1>dnOrmIdOfRowToChange: {{dnOrmIdOfRowToChange}}</h1> -->
    <el-input placeholder="Filter text" v-model="userTypedKeyword" />
    <div style="padding-top: 5px;">
      <el-table
            :data="cfGetMasterListOfDiagnosis"
            :show-header="false"
            :row-class-name="fnRowClass"
            height="300"
            @row-click="fnSelectionChange"
            style="width: 100%">
            <el-table-column
              prop="diagnosisName">
            </el-table-column>
          </el-table>
    </div>
  </div>
</template>

<script>

import clientSideTblPatientDiagnosis from '../db/client-side/structure/patient-of-diagnosis-table'
import clientSideTblMasterDiagnosis from '../db/client-side/structure/master-of-diagnosis-table'

export default {
  props: ['firstProp'],
  data() {
    return {
      dnOrmIdOfRowToChange: this.firstProp,
      userTypedKeyword: ''
    }
  },
  computed: {
    cfGetMasterListOfDiagnosis: function() {
      
      let arOfObjectsFromClientSideMasterDB = clientSideTblMasterDiagnosis
        .query()
        .with('linkWithPatient')
        .where('ROW_END', 2147483647.999999)
        .where((_record, query) => {
          query
            .where('diagnosisName', (value) =>
              value.toLowerCase().includes(this.userTypedKeyword.toLowerCase())
            )
        })
        .orderBy('parity', 'desc')
        .get();
        return arOfObjectsFromClientSideMasterDB;
    }
  },
  mounted() {},
  methods: {
    fnSetMasterDataParity() {
      const checkselectedData = clientSideTblMasterDiagnosis
        .query()
        .with('linkWithPatient')
        .where('ROW_END', 2147483647.999999).get();
        console.log('checkselectedData', checkselectedData);
      if(checkselectedData.length > 0) {
        for (let index = 0; index < checkselectedData.length; index++) {
          const element = checkselectedData[index];
          if(element.linkWithPatient != null) {
            clientSideTblMasterDiagnosis.update({
              where: element.masterDiagnosisId,
              data: {
                parity: 1,
              },
            })
          } else {
            clientSideTblMasterDiagnosis.update({
              where: element.masterDiagnosisId,
              data: {
                parity: 0,
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
        .where('ROW_END', 2147483647.999999)
        .get()
    },
    fnSelectionChange(rowData) {
      let masterDiagnosisId = rowData.masterDiagnosisId;
      const exists = this.fnCheckExistsDiagnosis(masterDiagnosisId)
      if (exists.length > 0) {
        clientSideTblPatientDiagnosis.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            ROW_END: Math.floor(Date.now() / 1000),
          },
        })
      } else {
        clientSideTblPatientDiagnosis.insert({
          data: {
            masterDiagnosisId: masterDiagnosisId,
            patientUUID: 1,
          }
        });
      }
    },
    fnRowClass(prData) {
      let masterDiagnosisId = prData.row.masterDiagnosisId;
      const exists = this.fnCheckExistsDiagnosis(masterDiagnosisId)
      if (exists.length > 0) {
        return 'row-selected-success';
      }
      return '';
    },
  },
}
</script>
<style>
  .row-selected-success {
    background-color: #409EFF !important;
    color: #fff !important;
  }
  .row-selected-success:hover {
    color: #409EFF !important;
    font-weight: bold;
  }
</style>
