<template>
  <div>
    <initializeWeightComponent />
  </div>
</template>

<script>
import initializeWeightComponent from '@/components/ptinfo-single/1time-1row-mField/vital-signs/sub-cts/weight/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientSideTable from '~/components/ptinfo-single/1time-1row-mField/vital-signs/sub-cts/weight/db/client-side/structure/table.js'

export default {
  components: {
    initializeWeightComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientSideTable.api().get(clientSideTable.apiUrl + '/getAll')
      */
    console.log('weight req sent')
    const proRemsFromDB = await clientSideTable.api().get(clientSideTable.apiUrl)
    console.log('weight recd')
    if (proRemsFromDB.ok) {
    }
  },
}
</script>
