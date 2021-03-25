<template>
  <div>
    <initializeBloodPressureComponent />
  </div>
</template>

<script>
import initializeBloodPressureComponent from '@/components/patient-data/blood-pressure/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientTbl from '~/components/patient-data/blood-pressure/db/client-side/structure/blood-pressure-of-a-patient-table.js'
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  components: {
    initializeBloodPressureComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proBloodPressureFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      */
    const ptUuidFromOrm = await clientTblOfCommonForAllComponents
      .query()
      .where(
        'fieldName',
        'ptUuid'
      )
      .first()

    if (process.env.loadInitialDataFromServer === true) {
      const proBloodPressureFromDB = await clientTbl.api().get(clientTbl.apiUrl+'/'+ptUuidFromOrm.fieldValue)
      if (proBloodPressureFromDB.ok) {
      }
    }
  },
}
</script>
