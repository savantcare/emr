<template>
  <div>
    <initializeDiagnosisComponent />
  </div>
</template>

<script>
import initializeDiagnosisComponent from '@/components/1time-Mrow-mField/diagnosis/db/client-side/static-data/insert-into-master-of-search-phrases-ct'
import clientSideTblPatientDiagnosis from './structure/patient-table-of-diagnosis'

export default {
  components: {
    initializeDiagnosisComponent,
  },
  async mounted() {
    const proDignosisFromDB = await clientSideTblPatientDiagnosis.api().get(clientSideTblPatientDiagnosis.apiUrl)
    if (proDignosisFromDB.ok) {
      console.log('Diagnosis loaded');
    }
  },
}
</script>
