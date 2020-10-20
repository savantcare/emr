<template>
  <div>
    <step1_init_search_phrases />
  </div>
</template>

<script>
import step1_init_search_phrases from '@/components/1time-1row-mField/date-of-birth/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientSideTable from '~/components/1time-1row-mField/date-of-birth/db/client-side/structure/patient-table-of-date-of-birth.js'
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
    const step3_get_latest_data_from_db_server = await clientSideTable
      .api()
      .get(clientSideTable.apiUrl + '/bfe041fa-073b-4223-8c69-0540ee678ff8')
    if (step3_get_latest_data_from_db_server.ok) {
    }
  },
}
</script>
