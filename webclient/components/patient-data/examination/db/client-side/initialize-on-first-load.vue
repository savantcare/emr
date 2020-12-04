<template>
  <div>
    <step1_init_search_phrases />
  </div>
</template>

<script>
import step1_init_search_phrases from '@/components/patient-data/examination/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

import clientTbl from '~/components/patient-data/examination/db/client-side/structure/examination-of-a-patient-table.js'
// import step2_init_examination_field_names from '@/components/patient-data/examination/db/client-side/dynamic-data/get-initial-data-from-server-ct.vue'

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
        const proExaminationFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      */
    /*    console.log('service statement req sent')
    const step3_get_latest_data_from_db_server = await clientTbl.api().get(clientTbl.apiUrl)
    console.log('service statement recd')
    if (step3_get_latest_data_from_db_server.ok) {
    }
     */
    if (process.env.loadInitialDataFromServer === true) {
      const proExaminationFromDB = await clientTbl.api().get(clientTbl.apiUrl)
      if (proExaminationFromDB.ok) {
      }
    }
  },
}
</script>
