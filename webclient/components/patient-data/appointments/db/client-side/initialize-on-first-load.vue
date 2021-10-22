<template>
  <div>
    <initializeAppointmentsComponent />
  </div>
</template>

<script>
import initializeAppointmentsComponent from '@/components/patient-data/appointments/db/client-side/static-data/insert-into-appointment-client-side-table.vue'
import clientTbl from '~/components/patient-data/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  components: {
    initializeAppointmentsComponent,
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
