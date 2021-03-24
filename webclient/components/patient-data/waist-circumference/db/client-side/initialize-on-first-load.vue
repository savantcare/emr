<template>
  <div>
    <initializeWaistCircumferenceComponent />
  </div>
</template>

<script>
import initializeWaistCircumferenceComponent from '@/components/patient-data/waist-circumference/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientTbl from '~/components/patient-data/waist-circumference/db/client-side/structure/waist-circumference-of-a-patient-table.js'
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  components: {
    initializeWaistCircumferenceComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      */
    if (process.env.loadInitialDataFromServer === true) {
      const ptUuidFromOrm = await clientTblOfCommonForAllComponents
      .query()
      .where(
        'fieldName',
        'ptUuid'
      )
      .first()

      const proWaistCircumferenceFromDB = await clientTbl.api().get(clientTbl.apiUrl+'/'+ptUuidFromOrm.fieldValue)
      if (proWaistCircumferenceFromDB.ok) {
      }
    }
  },
}
</script>
