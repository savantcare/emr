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
        pastPsychHistoryDescription: 'Past outpatient treatment',
        pastPsychHistoryCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: 'Past meds trials',
        pastPsychHistoryCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: 'Hospitalization',
        pastPsychHistoryCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: 'History of violence',
        pastPsychHistoryCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: 'History of self-harm',
        pastPsychHistoryCategory: 'Total minutes in psychotherapy',
      },
    })

    i = i + 1
    clientSideTblOfMasterPastPsychHistory.insert({
      data: {
        pastPsychHistoryMasterId: i,
        pastPsychHistoryDescription: 'Past substance abuse',
        pastPsychHistoryCategory: 'Total minutes in psychotherapy',
      },
    })
  },
}
</script>
