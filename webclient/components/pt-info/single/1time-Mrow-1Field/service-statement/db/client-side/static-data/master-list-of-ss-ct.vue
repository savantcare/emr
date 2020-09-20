<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import ClientSideTblMasterServiceStatement from '@/components/pt-info/single/1time-Mrow-1Field/service-statement/db/client-side/structure/table-master-list-of-service-statements.js'

export default {
  data() {
    return {}
  },
  mounted() {
    ClientSideTblMasterServiceStatement.insert({
      data: {
        masterRowId: '1', // this is uuid-1 to easily distinhuish it from the same row field -> id
        serviceStatementDescription: 'Spent 10 mins with patient',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        masterRowId: '2',
        serviceStatementDescription: 'Spent 15 mins with patient',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        masterRowId: '3',
        serviceStatementDescription: 'Spent 20 mins with patient',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        masterRowId: '4',
        serviceStatementDescription: 'Spent 25 mins with patient',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        masterRowId: '5',
        serviceStatementDescription: 'Spent 30 mins with patient',
      },
    })
  },
}
</script>
