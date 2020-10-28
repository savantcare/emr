<template>
  <div>
    <initializeMentalStatusExamComponent />
  </div>
</template>

<script>
import initializeMentalStatusExamComponent from '@/components/temporal/mental-status-exam/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientTbl from '~/components/temporal/mental-status-exam/db/client-side/structure/patient-table-of-mental-status-exam.js'

export default {
  components: {
    initializeMentalStatusExamComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proMseFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      */
    if (process.env.loadInitialDataFromServer === true) {
      const proMseFromDB = await clientTbl.api().get(clientTbl.apiUrl)
      if (proMseFromDB.ok) {
      }
    }
  },
}
</script>
