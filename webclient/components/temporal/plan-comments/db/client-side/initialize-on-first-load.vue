<template>
  <div>
    <initializeRecommendationComponent />
  </div>
</template>

<script>
import initializeRecommendationComponent from '@/components/temporal/plan-comments/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientTbl from '~/components/temporal/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'

export default {
  components: {
    initializeRecommendationComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      */
    const proRemsFromDB = await clientTbl.api().get(clientTbl.apiUrl)
    if (proRemsFromDB.ok) {
    }
  },
}
</script>
