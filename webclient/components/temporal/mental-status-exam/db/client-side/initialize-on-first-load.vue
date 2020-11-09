<template>
  <div>
    <step1_init_search_phrases />
    <step2_init_mse_select_options />
  </div>
</template>

<script>
import step1_init_search_phrases from '@/components/temporal/mental-status-exam/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import step2_init_mse_select_options from '@/components/temporal/mental-status-exam/db/client-side/static-data/insert-into-mental-status-exam-all-select-options.vue'

import clientTbl from '~/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-of-a-patient-table.js'
// import step2_init_mse_field_names from '@/components/temporal/mental-status-exam/db/client-side/dynamic-data/get-initial-data-from-server-ct.vue'

export default {
  components: {
    step1_init_search_phrases,
    step2_init_mse_select_options,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proMseFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      */
    /*    console.log('service statement req sent')
    const step3_get_latest_data_from_db_server = await clientTbl.api().get(clientTbl.apiUrl)
    console.log('service statement recd')
    if (step3_get_latest_data_from_db_server.ok) {
    }
     */
    if (process.env.loadInitialDataFromServer === true) {
      const proMseFromDB = await clientTbl.api().get(clientTbl.apiUrl)
      if (proMseFromDB.ok) {
      }
    }
  },
}
</script>
