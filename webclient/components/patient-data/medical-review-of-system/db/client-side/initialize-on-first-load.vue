<template>
  <div>
    <initializeMedicalReviewOfSystemComponent />
  </div>
</template>

<script>
import initializeMedicalReviewOfSystemComponent from '@/components/patient-data/medical-review-of-system/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientTbl from '~/components/patient-data/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  components: {
    initializeMedicalReviewOfSystemComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proMedicalReviewOfSystemFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      */
    if (process.env.loadInitialDataFromServer === true) {
      const ptUuidFromOrm = await clientTblOfCommonForAllComponents
      .query()
      .where(
        'fieldName',
        'ptUuid'
      )
      .first()

    const proMedicalReviewOfSystemFromDB = await clientTbl.api().get(clientTbl.apiUrl+'/'+ptUuidFromOrm.fieldValue)
      if (proMedicalReviewOfSystemFromDB.ok) {
      }
    }
  },
}
</script>
