<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientSideTblMasterServiceStatement from '@/components/pt-info/single/1time-Mrow-1Field/service-statement/db/client-side/structure/table-master-list-of-service-statements.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '1', // this is uuid-1 to easily distinhuish it from the same row field -> id
        serviceStatementDescription: '90 minutes',
        serviceStatementCategory: 'Time in psychotherapy',
      },
    })
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '2',
        serviceStatementDescription: '85 minutes',
        serviceStatementCategory: 'Time in psychotherapy',
      },
    })
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '3',
        serviceStatementDescription: '80 minutes',
        serviceStatementCategory: 'Time in psychotherapy',
      },
    })
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '4',
        serviceStatementDescription: '75 minutes',
        serviceStatementCategory: 'Time in psychotherapy',
      },
    })
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '5',
        serviceStatementDescription: '70 minutes',
        serviceStatementCategory: 'Time in psychotherapy',
      },
    })
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '6',
        serviceStatementDescription: 'Client Centered',
        serviceStatementCategory: 'Modality of Psychotherapy',
      },
    })
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '7',
        serviceStatementDescription: 'Dialectical Behavior therapy',
        serviceStatementCategory: 'Modality of Psychotherapy',
      },
    })
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '8',
        serviceStatementDescription: 'Holistic Therapy',
        serviceStatementCategory: 'Modality of Psychotherapy',
      },
    })
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '9',
        serviceStatementDescription: 'Existential humanistic',
        serviceStatementCategory: 'Modality of Psychotherapy',
      },
    })
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '10',
        serviceStatementDescription: 'Bibilotherapy',
        serviceStatementCategory: 'Modality of Psychotherapy',
      },
    })
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '11',
        serviceStatementDescription: '60',
        serviceStatementCategory: 'Total time with patient',
      },
    })
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '12',
        serviceStatementDescription: '55',
        serviceStatementCategory: 'Total time with patient',
      },
    })
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '13',
        serviceStatementDescription: '50',
        serviceStatementCategory: 'Total time with patient',
      },
    })
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '14',
        serviceStatementDescription: '45',
        serviceStatementCategory: 'Total time with patient',
      },
    })
    clientSideTblMasterServiceStatement.insert({
      data: {
        serviceStatementMasterId: '15',
        serviceStatementDescription: '40',
        serviceStatementCategory: 'Total time with patient',
      },
    })
  },
}
</script>
