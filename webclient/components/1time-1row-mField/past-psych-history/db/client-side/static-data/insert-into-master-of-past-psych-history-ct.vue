<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientSideTblOfMasterPastPsychHistory from '@/components/1time-1row-mField/past-psych-history/db/client-side/structure/master-table-of-past-psych-history.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: '60',
        pastPsychHistoryCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: '55',
        pastPsychHistoryCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: '50',
        pastPsychHistoryCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: '45',
        pastPsychHistoryCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: '40',
        pastPsychHistoryCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: 'Client Centered',
        pastPsychHistoryCategory: 'Modality of Psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: 'Dialectical Behavior therapy',
        pastPsychHistoryCategory: 'Modality of Psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: 'Holistic Therapy',
        pastPsychHistoryCategory: 'Modality of Psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: 'Existential humanistic',
        pastPsychHistoryCategory: 'Modality of Psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: 'Bibilotherapy',
        pastPsychHistoryCategory: 'Modality of Psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: '60',
        pastPsychHistoryCategory: 'Total minutes with patient',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: '55',
        pastPsychHistoryCategory: 'Total minutes with patient',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: '50',
        pastPsychHistoryCategory: 'Total minutes with patient',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: '45',
        pastPsychHistoryCategory: 'Total minutes with patient',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: '40',
        pastPsychHistoryCategory: 'Total minutes with patient',
      },
    })
  },
}
</script>
