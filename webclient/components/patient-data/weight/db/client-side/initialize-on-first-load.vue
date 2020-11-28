<template>
  <div>
    <initializeWeightComponent />
  </div>
</template>

<script>
import initializeWeightComponent from '@/components/patient-data/weight/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientTbl from '~/components/patient-data/weight/db/client-side/structure/weight-of-a-patient-table.js'

export default {
  components: {
    initializeWeightComponent,
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
