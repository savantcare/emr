<template>
  <div>
    <initializeScreenComponent />
  </div>
</template>

<script>
import initializeScreenComponent from '@/components/temporal/screens/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientTbl from '~/components/temporal/screens/db/client-side/structure/screens-of-a-patient-table.js'

export default {
  components: {
    initializeScreenComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      */
    if (process.env.loadInitialDataFromServer === true) {
      const proRemsFromDB = await clientTbl.api().get(clientTbl.apiUrl)
      if (proRemsFromDB.ok) {
      }
    }
  },
}
</script>
