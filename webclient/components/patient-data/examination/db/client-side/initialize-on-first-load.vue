<template>
  <div>
    <initializeExaminationComponent />
  </div>
</template>

<script>
import initializeExaminationComponent from '@/components/patient-data/examination/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

import clientTbl from '~/components/patient-data/examination/db/client-side/structure/examination-of-a-patient-table.js'
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  components: {
    initializeExaminationComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proExaminationFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
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

      const proExaminationFromDB = await clientTbl.api().get(clientTbl.apiUrl+'/'+ptUuidFromOrm.fieldValue)
      if (proExaminationFromDB.ok) {
      }
    }
  },
}
</script>
