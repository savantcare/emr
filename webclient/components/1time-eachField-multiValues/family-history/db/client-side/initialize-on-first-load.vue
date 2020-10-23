<template>
  <div>
    <initializeFamilyHistoryComponent />
  </div>
</template>

<script>
import initializeFamilyHistoryComponent from '@/components/1time-eachField-multiValues/family-history/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientSideTable from '~/components/1time-eachField-multiValues/family-history/db/client-side/structure/family-history-of-a-patient-table.js'

export default {
  components: {
    initializeFamilyHistoryComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientSideTable.api().get(clientSideTable.apiUrl + '/getAll')
      */

    if (process.env.useServerDBForFamilyHistory === true) {
      const proFromDB = await clientSideTable.api().get(clientSideTable.apiUrl)
      if (proFromDB.ok) {
      }
    }
  },
}
</script>
