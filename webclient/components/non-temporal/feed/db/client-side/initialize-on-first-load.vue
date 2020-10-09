<template>
  <div>
    <initializeSsComponent />
    <insertIntoMasterTblOfServiceStatementDuringInitOfCt />
  </div>
</template>

<script>
import initializeSsComponent from '@/components/1time-Mrow-1Field/service-statement/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertIntoMasterTblOfServiceStatementDuringInitOfCt from '@/components/1time-Mrow-1Field/service-statement/db/client-side/static-data/insert-into-master-of-service-statement-ct.vue'

export default {
  components: {
    initializeSsComponent,
    insertIntoMasterTblOfServiceStatementDuringInitOfCt,
  },
}
</script>
