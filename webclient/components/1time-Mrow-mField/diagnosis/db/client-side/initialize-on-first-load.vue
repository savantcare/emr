<template>
  <div>
    <step1_init_search_phrases />
    <step2_init_ss_field_names />
  </div>
</template>

<script>
import step1_init_search_phrases from './static-data/insert-into-master-of-search-phrases-ct'
import step2_init_ss_field_names from './static-data/insert-into-master-of-diagnosis-ct'

import clientSideTblPatientDiagnosis from './structure/patient-table-of-diagnosis'
import clientSideTblMasterDiagnosis from './structure/master-table-of-diagnosis'

export default {
  components: {
    step1_init_search_phrases,
    step2_init_ss_field_names,
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
