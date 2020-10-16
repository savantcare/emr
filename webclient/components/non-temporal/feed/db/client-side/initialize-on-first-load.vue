<template>
  <div>
    <initializeSsComponent />
    <insertIntoMasterTblOfServiceStatementDuringInitOfCt />
  </div>
</template>

<script>
import initializeSsComponent from '@/components/1time-1row-mField/service-statement/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertIntoMasterTblOfServiceStatementDuringInitOfCt from '@/components/1time-1row-mField/service-statement/db/client-side/static-data/insert-into-master-of-service-statement-ct.vue'

export default {
  components: {
    initializeSsComponent,
    insertIntoMasterTblOfServiceStatementDuringInitOfCt,
  },
}
</script>
