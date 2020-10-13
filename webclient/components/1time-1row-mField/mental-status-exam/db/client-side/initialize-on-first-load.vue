<template>
  <div>
    <initializeMentalStatusExamComponent />
  </div>
</template>

<script>
import initializeMentalStatusExamComponent from '@/components/1time-1row-mField/mental-status-exam/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientSideTable from '~/components/1time-1row-mField/mental-status-exam/db/client-side/structure/patient-table-of-mental-status-exam.js'

export default {
  components: {
    initializeMentalStatusExamComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientSideTable.api().get(clientSideTable.apiUrl + '/getAll')
      */
    const proMseFromDB = await clientSideTable.api().get(clientSideTable.apiUrl)
    if (proMseFromDB.ok) {
    }
  },
}
</script>
