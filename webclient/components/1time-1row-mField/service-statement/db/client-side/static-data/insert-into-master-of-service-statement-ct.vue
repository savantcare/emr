<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientSideTblOfMasterServiceStatement from '@/components/1time-1row-mField/service-statement/db/client-side/structure/master-table-of-service-statements.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '60',
        serviceStatementFieldCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '55',
        serviceStatementFieldCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '50',
        serviceStatementFieldCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '45',
        serviceStatementFieldCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '40',
        serviceStatementFieldCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: 'Client Centered',
        serviceStatementFieldCategory: 'Modality of Psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: 'Dialectical Behavior therapy',
        serviceStatementFieldCategory: 'Modality of Psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: 'Holistic Therapy',
        serviceStatementFieldCategory: 'Modality of Psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: 'Existential humanistic',
        serviceStatementFieldCategory: 'Modality of Psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: 'Bibilotherapy',
        serviceStatementFieldCategory: 'Modality of Psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '60',
        serviceStatementFieldCategory: 'Total minutes with patient',
      },
    })

    i = i + 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '55',
        serviceStatementFieldCategory: 'Total minutes with patient',
      },
    })

    i = i + 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '50',
        serviceStatementFieldCategory: 'Total minutes with patient',
      },
    })

    i = i + 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '45',
        serviceStatementFieldCategory: 'Total minutes with patient',
      },
    })

    i = i + 1
    clientSideTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '40',
        serviceStatementFieldCategory: 'Total minutes with patient',
      },
    })
  },
}
</script>
