<template>
  <div>
    <initializeDiagnosisComponent />
  </div>
</template>

<script>
import initializeDiagnosisComponent from '@/components/1time-Mrow-mField/diagnosis/db/client-side/static-data/insert-into-master-of-search-phrases-ct'
import clientSideTblPatientDiagnosis from './structure/patient-table-of-diagnosis'
import clientSideTblMasterDiagnosis from './structure/master-table-of-diagnosis'

export default {
  components: {
    initializeDiagnosisComponent,
  },
  async mounted() {
    const proDignosisFromDB = await clientSideTblPatientDiagnosis.api().get(clientSideTblPatientDiagnosis.apiUrl)
    if (proDignosisFromDB.response.status === 200) {
      if(proDignosisFromDB.response.data.length > 0) {
        // Remove the diagnosis from master of list, the diagnosis is alredy added
        const respondsData = proDignosisFromDB.response.data;
        for (let i = 0; i < respondsData.length; i++) {
          const element = respondsData[i];
          if(element.ROW_END == 2147483648000) {
            await clientSideTblMasterDiagnosis.update({
              where: (record) =>
                record.masterDiagnosisId === element.masterDiagnosisId,
              data: {
                isAssignedToPatient: true
              },
            })
          }
          
        }
      }
    }
  },
}
</script>
