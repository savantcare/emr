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
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '60',
        serviceStatementFieldNameInDb: 'Total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '55',
        serviceStatementFieldNameInDb: 'Total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '50',
        serviceStatementFieldNameInDb: 'Total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '45',
        serviceStatementFieldNameInDb: 'Total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '40',
        serviceStatementFieldNameInDb: 'Total_minutes_in_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: 'Client Centered',
        serviceStatementFieldNameInDb: 'Modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: 'Dialectical Behavior therapy',
        serviceStatementFieldNameInDb: 'Modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: 'Holistic Therapy',
        serviceStatementFieldNameInDb: 'Modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: 'Existential humanistic',
        serviceStatementFieldNameInDb: 'Modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: 'Bibilotherapy',
        serviceStatementFieldNameInDb: 'Modality_of_psychotherapy',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '60',
        serviceStatementFieldNameInDb: 'Total_minutes_with_patient',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '55',
        serviceStatementFieldNameInDb: 'Total_minutes_with_patient',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '50',
        serviceStatementFieldNameInDb: 'Total_minutes_with_patient',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '45',
        serviceStatementFieldNameInDb: 'Total_minutes_with_patient',
      },
    })

    i = i + 1
    clientTblOfMasterServiceStatement.insert({
      data: {
        serviceStatementFieldMasterId: i,
        serviceStatementFieldDescription: '40',
        serviceStatementFieldNameInDb: 'Total_minutes_with_patient',
      },
    })
  },
}
</script>
