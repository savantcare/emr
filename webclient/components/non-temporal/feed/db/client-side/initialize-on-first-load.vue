<template>
  <div>
    <initializeSsComponent />
    <insertIntoMasterTblOfServiceStatementDuringInitOfCt />
  </div>
</template>

<script>
import initializeSsComponent from '@/components/temporal/service-statements/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertIntoMasterTblOfServiceStatementDuringInitOfCt from '@/components/temporal/service-statements/db/client-side/static-data/insert-into-master-of-service-statement-ct.vue'

export default {
  components: {
    initializeSsComponent,
    insertIntoMasterTblOfServiceStatementDuringInitOfCt,
  },
}
</script>
