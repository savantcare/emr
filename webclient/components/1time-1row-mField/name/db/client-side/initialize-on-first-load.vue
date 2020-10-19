<template>
  <div>
    <step1_init_search_phrases />
    <step2_init_name_field_names />
  </div>
</template>

<script>
import step1_init_search_phrases from '@/components/1time-1row-mField/name/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
// Step 2 of field names needs to be added.
import step2_init_name_field_names from '@/components/1time-1row-mField/name/db/client-side/static-data/insert-into-master-of-name-ct.vue'
import clientSideTable from '~/components/1time-1row-mField/name/db/client-side/structure/patient-table-of-name.js'

export default {
  components: {
    step1_init_search_phrases,
    step2_init_name_field_names,
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
