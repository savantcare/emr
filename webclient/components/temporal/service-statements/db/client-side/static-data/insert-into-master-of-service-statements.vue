<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientTblOfMasterServiceStatement from '@/components/temporal/service-statements/db/client-side/structure/service-statements-master.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '60',
        serviceStatementFieldNameInDb: 'Total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '55',
        serviceStatementFieldNameInDb: 'Total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '50',
        serviceStatementFieldNameInDb: 'Total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '45',
        serviceStatementFieldNameInDb: 'Total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '40',
        serviceStatementFieldNameInDb: 'Total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: 'Client Centered',
        serviceStatementFieldNameInDb: 'Modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: 'Dialectical Behavior therapy',
        serviceStatementFieldNameInDb: 'Modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: 'Holistic Therapy',
        serviceStatementFieldNameInDb: 'Modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: 'Existential humanistic',
        serviceStatementFieldNameInDb: 'Modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: 'Bibilotherapy',
        serviceStatementFieldNameInDb: 'Modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '60',
        serviceStatementFieldNameInDb: 'Total_minutes_with_patient',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '55',
        serviceStatementFieldNameInDb: 'Total_minutes_with_patient',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '50',
        serviceStatementFieldNameInDb: 'Total_minutes_with_patient',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '45',
        serviceStatementFieldNameInDb: 'Total_minutes_with_patient',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '40',
        serviceStatementFieldNameInDb: 'Total_minutes_with_patient',
      },
    })
  },
}
</script>
