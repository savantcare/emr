<template>
  <div>
    <initializeMedicalHistoryComponent />
  </div>
</template>

<script>
import initializeMedicalHistoryComponent from '@/components/patient-data/medical-history/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientTbl from '~/components/patient-data/medical-history/db/client-side/structure/medical-history-of-a-patient-table.js'

export default {
  components: {
    initializeMedicalHistoryComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      */

    if (process.env.useServerDBForMedicalHistory === true) {
      const proFromDB = await clientTbl.api().get(clientTbl.apiUrl)
      if (proFromDB.ok) {
      }
    }
  },
}
</script>
