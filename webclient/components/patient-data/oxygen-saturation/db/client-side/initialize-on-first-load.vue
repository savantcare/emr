<template>
  <div>
    <initializeRecommendationComponent />
  </div>
</template>

<script>
import initializeRecommendationComponent from '@/components/patient-data/oxygen-saturation/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientTbl from '~/components/patient-data/oxygen-saturation/db/client-side/structure/oxygen-saturation-of-a-patient-table.js'

export default {
  components: {
    initializeRecommendationComponent,
  },
  async mounted() {
    // $fetch use for Load data from the IndexedDB store associated to a model and persist them in the Vuex Store
    await clientTbl.$fetch()
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
