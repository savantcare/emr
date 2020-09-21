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
        serviceStatementMasterId: '1', // this is uuid-1 to easily distinhuish it from the same row field -> id
        serviceStatementDescription: 'Time in psychotherapy: 90 minutes',
        serviceStatementCategory: 'Therapy SS - Time spent',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '2',
        serviceStatementDescription: 'Time in psychotherapy: 85 minutes',
        serviceStatementCategory: 'Therapy SS - Time spent',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '3',
        serviceStatementDescription: 'Time in psychotherapy: 80 minutes',
        serviceStatementCategory: 'Therapy SS - Time spent',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '4',
        serviceStatementDescription: 'Time in psychotherapy: 75 minutes',
        serviceStatementCategory: 'Therapy SS - Time spent',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '5',
        serviceStatementDescription: 'Time in psychotherapy: 70 minutes',
        serviceStatementCategory: 'Therapy SS - Time spent',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '6',
        serviceStatementDescription: 'Modality of Psychotherapy: Client Centered',
        serviceStatementCategory: ' Therapy SS - Modality',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '7',
        serviceStatementDescription: 'Modality of Psychotherapy: Dialectical Behavior therapy',
        serviceStatementCategory: ' Therapy SS - Modality',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '8',
        serviceStatementDescription: 'Modality of Psychotherapy: Holistic Therapy',
        serviceStatementCategory: ' Therapy SS - Modality',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '9',
        serviceStatementDescription: 'Modality of Psychotherapy: Existential humanistic',
        serviceStatementCategory: ' Therapy SS - Modality',
      },
    })
    ClientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '10',
        serviceStatementDescription: 'Modality of Psychotherapy: Bibilotheray',
        serviceStatementCategory: ' Therapy SS - Modality',
      },
    })
  },
}
</script>
