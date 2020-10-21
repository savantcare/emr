<template>
  <div>
    <initializeRecommendationComponent />
  </div>
</template>

<script>
import initializeRecommendationComponent from '@/components/1time-Mrow-1Field/misc-notes/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientSideTable from '~/components/1time-Mrow-1Field/misc-notes/db/client-side/structure/misc-notes-of-a-patient-table.js'

export default {
  components: {
    initializeRecommendationComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientSideTable.api().get(clientSideTable.apiUrl + '/getAll')
      */
    const proRemsFromDB = await clientSideTable.api().get(clientSideTable.apiUrl)
    if (proRemsFromDB.ok) {
    }
  },
}
</script>
