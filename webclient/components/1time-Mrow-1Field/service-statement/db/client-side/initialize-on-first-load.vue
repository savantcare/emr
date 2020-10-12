<template>
  <div>
    <initializeSsComponent />
    <insertIntoMasterTblOfServiceStatementDuringInitOfCt />
  </div>
</template>

<script>
import initializeSsComponent from '@/components/1time-Mrow-1Field/service-statement/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertIntoMasterTblOfServiceStatementDuringInitOfCt from '@/components/1time-Mrow-1Field/service-statement/db/client-side/static-data/insert-into-master-of-service-statement-ct.vue'
import clientSideTable from '~/components/1time-Mrow-1Field/service-statement/db/client-side/structure/patient-table-of-service-statements.js'
// import insertIntoMasterTblOfServiceStatementDuringInitOfCt from '@/components/1time-Mrow-1Field/service-statement/db/client-side/dynamic-data/get-initial-data-from-server-ct.vue'

export default {
  components: {
    initializeSsComponent,
    insertIntoMasterTblOfServiceStatementDuringInitOfCt,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientSideTable.api().get(clientSideTable.apiUrl + '/getAll')
      */
    console.log('service statement req sent')
    const proRemsFromDB = await clientSideTable.api().get(clientSideTable.apiUrl)
    console.log('service statement recd')
    if (proRemsFromDB.ok) {
    }
  },
}
</script>
