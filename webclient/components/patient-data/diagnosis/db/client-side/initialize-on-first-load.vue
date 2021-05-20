<template>
  <div>
    <initializeDiagnosisComponent />
  </div>
</template>

<script>
import initializeDiagnosisComponent from '@/components/patient-data/diagnosis/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientTbl from '~/components/patient-data/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  components: {
    initializeDiagnosisComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      */
     const ptUuidFromOrm = await clientTblOfCommonForAllComponents
      .query()
      .where(
        'fieldName',
        'ptUuid'
      )
      .first()
      if (process.env.loadInitialDataFromServer === true) {
        const proDiagnosisFromDB = await clientTbl.api().get(clientTbl.apiUrl+'/'+ptUuidFromOrm.fieldValue)
        if (proDiagnosisFromDB.ok) {
        }
      }
  },
}
</script>
