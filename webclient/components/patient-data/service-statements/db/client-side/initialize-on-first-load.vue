<template>
  <div>
    <step1_init_search_phrases />
  </div>
</template>

<script>
import step1_init_search_phrases from '@/components/patient-data/service-statements/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

import clientTbl from '~/components/patient-data/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'
// import step2_init_ss_field_names from '@/components/patient-data/service-statements/db/client-side/dynamic-data/get-initial-data-from-server-ct.vue'
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  components: {
    step1_init_search_phrases,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proSSFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      */

    const ptUuidFromOrm = await clientTblOfCommonForAllComponents.query().where('fieldName', 'ptUuid').first()

    if (process.env.loadInitialDataFromServer === true) {
      const proSSFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/' + ptUuidFromOrm.fieldValue)
      if (proSSFromDB.ok) {
      }
    }
  },
}
</script>
