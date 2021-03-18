<template>
  <div>
    <initializePsychReviewOfSystemsComponent />
  </div>
</template>

<script>
import step1_init_search_phrases from '@/components/patient-data/psych-review-of-system/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializePsychReviewOfSystemsComponent from '@/components/patient-data/psych-review-of-system/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientTbl from '~/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'
// import step2_init_ss_field_names from '@/components/patient-data/psych-review-of-system/db/client-side/dynamic-data/get-initial-data-from-server-ct.vue'
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  components: {
    initializePsychReviewOfSystemsComponent,
  },
  async mounted() {
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
    if (process.env.loadInitialDataFromServer === true) {
      const ptUuidFromOrm = await clientTblOfCommonForAllComponents
      .query()
      .where(
        'fieldName',
        'ptUuid'
      )
      .first()
      const proPsychReviewOfSystemsFromDB = await clientTbl.api().get(clientTbl.apiUrl+'/'+ptUuidFromOrm.fieldValue)
      if (proPsychReviewOfSystemsFromDB.ok) {
      }
    }
  },
}
</script>
