<template>
  <div>
    <initializeAllergiesComponent />
  </div>
</template>

<script>
import initializeAllergiesComponent from '@/components/patient-data/allergies/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientTbl from '~/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'
import allergiesPresentClientTbl from '~/components/patient-data/allergies/db/client-side/structure/allergies-present-of-a-patient-table.js'

export default {
  components: {
    initializeAllergiesComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      */
    const ptUuidFromOrm = await clientTblOfCommonForAllComponents
      .query()
      .where(
        'fieldName',
        'ptUuid'
      )
      .first()

    if (process.env.loadInitialDataFromServer === true) {
      const proAllesPresentFromDB = await allergiesPresentClientTbl.api().get(allergiesPresentClientTbl.apiUrl+'/'+ptUuidFromOrm.fieldValue)
      if (proAllesPresentFromDB.ok) {
      }

      const proAllesFromDB = await clientTbl.api().get(clientTbl.apiUrl+'/'+ptUuidFromOrm.fieldValue)
      if (proAllesFromDB.ok) {
      }
    }
  },
}
</script>
