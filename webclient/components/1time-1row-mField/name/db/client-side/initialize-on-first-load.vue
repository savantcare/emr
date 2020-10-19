<template>
  <div>
    <step1_init_search_phrases />
  </div>
</template>

<script>
import step1_init_search_phrases from '@/components/1time-1row-mField/name/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
// Step 2 of field names needs to be added.
import clientSideTable from '~/components/1time-1row-mField/name/db/client-side/structure/table.js'

export default {
  components: {
    step1_init_search_phrases,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientSideTable.api().get(clientSideTable.apiUrl + '/getAll')
      */
    console.log('name req sent')
    const step3_get_latest_data_from_db_server = await clientSideTable.api().get(clientSideTable.apiUrl)
    console.log('name recd')
    if (step3_get_latest_data_from_db_server.ok) {
    }
  },
}
</script>
