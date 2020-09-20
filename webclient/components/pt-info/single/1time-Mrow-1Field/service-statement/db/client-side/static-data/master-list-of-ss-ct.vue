<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import ClientSideTblMasterServiceStatement from '@/components/pt-info/single/1time-Mrow-1Field/service-statement/db/client-side/structure/table-master-list-of-ss.js'

export default {
  data() {
    return {}
  },
  mounted() {
    ClientSideTblMasterServiceStatement.insert({
      data: {
        serverSideRowUuid: '1',
        serviceStatementDescription: 'Spent 10 mins with patient',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        serverSideRowUuid: '2',
        serviceStatementDescription: 'Spent 15 mins with patient',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        serverSideRowUuid: '3',
        serviceStatementDescription: 'Spent 20 mins with patient',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        serverSideRowUuid: '4',
        serviceStatementDescription: 'Spent 25 mins with patient',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        serverSideRowUuid: '5',
        serviceStatementDescription: 'Spent 30 mins with patient',
      },
    })
  },
}
</script>
