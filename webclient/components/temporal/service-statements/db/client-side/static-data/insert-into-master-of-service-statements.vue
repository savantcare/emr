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
        serviceStatementFieldNameInDb: 'total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '55',
        serviceStatementFieldNameInDb: 'total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '50',
        serviceStatementFieldNameInDb: 'total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '45',
        serviceStatementFieldNameInDb: 'total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '40',
        serviceStatementFieldNameInDb: 'total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: 'Client Centered',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: 'Dialectical Behavior therapy',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: 'Holistic Therapy',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: 'Existential humanistic',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: 'Bibilotherapy',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '60',
        serviceStatementFieldNameInDb: 'total_minutes_with_patient',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '55',
        serviceStatementFieldNameInDb: 'total_minutes_with_patient',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '50',
        serviceStatementFieldNameInDb: 'total_minutes_with_patient',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '45',
        serviceStatementFieldNameInDb: 'total_minutes_with_patient',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldOptionId: i,
        serviceStatementFieldOptionLabel: '40',
        serviceStatementFieldNameInDb: 'total_minutes_with_patient',
      },
    })
  },
}
</script>
