<template>
  <div>
    <initializePastPsychHistoryComponent />
    <insertIntoMasterTblOfPastPsychHistoryDuringInitOfCt />
  </div>
</template>

<script>
import initializePastPsychHistoryComponent from '@/components/1time-1row-mField/past-psych-history/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertIntoMasterTblOfPastPsychHistoryDuringInitOfCt from '@/components/1time-1row-mField/past-psych-history/db/client-side/static-data/insert-into-master-of-past-psych-history-ct.vue'
// import insertIntoMasterTblOfPastPsychHistoryDuringInitOfCt from '@/components/1time-1row-mField/past-psych-history/db/client-side/dynamic-data/get-initial-data-from-server-ct.vue'

export default {
  components: {
    initializePastPsychHistoryComponent,
    insertIntoMasterTblOfPastPsychHistoryDuringInitOfCt,
  },
}
</script>
