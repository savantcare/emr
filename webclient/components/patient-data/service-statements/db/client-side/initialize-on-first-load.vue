<template>
  <div>
    <step1_init_search_phrases />
  </div>
</template>

<script>
import step1_init_search_phrases from '@/components/patient-data/service-statements/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

import clientTbl from '~/components/patient-data/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'
// import step2_init_ss_field_names from '@/components/patient-data/service-statements/db/client-side/dynamic-data/get-initial-data-from-server-ct.vue'

export default {
  components: {
    step1_init_search_phrases,
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
    /*    console.log('service statement req sent')
    const step3_get_latest_data_from_db_server = await clientTbl.api().get(clientTbl.apiUrl)
    console.log('service statement recd')
    if (step3_get_latest_data_from_db_server.ok) {
    }
     */
  },
}
</script>
