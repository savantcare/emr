<template>
  <div>
    <initializeBmiComponent />
  </div>
</template>

<script>
import initializeBmiComponent from '@/components/patient-data/bmi/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientTbl from '~/components/patient-data/bmi/db/client-side/structure/bmi-of-a-patient-table.js'
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  components: {
    initializeBmiComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proBmiFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      */
    const ptUuidFromOrm = await clientTblOfCommonForAllComponents
      .query()
      .where(
        'fieldName',
        'ptUuid'
      )
      .first()

    if (process.env.loadInitialDataFromServer === true) {
      const proBmiFromDB = await clientTbl.api().get(clientTbl.apiUrl+'/'+ptUuidFromOrm.fieldValue)
      if (proBmiFromDB.ok) {
      }
    }
  },
}
</script>
