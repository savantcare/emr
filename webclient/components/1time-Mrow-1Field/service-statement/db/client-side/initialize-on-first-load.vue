<template>
  <div>
    <step1_init_search_phrases />
    <step2_init_ss_field_names />
  </div>
</template>

<script>
import step1_init_search_phrases from '@/components/1time-Mrow-1Field/service-statement/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import step2_init_ss_field_names from '@/components/1time-Mrow-1Field/service-statement/db/client-side/static-data/insert-into-master-of-service-statement-ct.vue'
import clientSideTable from '~/components/1time-Mrow-1Field/service-statement/db/client-side/structure/patient-table-of-service-statements.js'
// import step2_init_ss_field_names from '@/components/1time-Mrow-1Field/service-statement/db/client-side/dynamic-data/get-initial-data-from-server-ct.vue'

export default {
  components: {
    step1_init_search_phrases,
    step2_init_ss_field_names,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientSideTable.api().get(clientSideTable.apiUrl + '/getAll')
      */
    console.log('service statement req sent')
    const step3_get_latest_data_from_db_server = await clientSideTable.api().get(clientSideTable.apiUrl)
    console.log('service statement recd')
    if (step3_get_latest_data_from_db_server.ok) {
    }
  },
}
</script>
