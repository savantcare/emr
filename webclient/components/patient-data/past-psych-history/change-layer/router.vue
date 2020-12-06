<template>
  <div v-if="rowIdForEdit > 0">
    Edit Past psych history
    <pastPsychHistoryEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <pastPsychHistoryAdd />
  </div>
</template>

<script>
import pastPsychHistoryTbl from '@/components/patient-data/past-psych-history/db/client-side/structure/past-psych-history-of-a-patient-table.js'
import pastPsychHistoryEdit from '@/components/patient-data/past-psych-history/change-layer/past-psych-history-edit.vue'
import pastPsychHistoryAdd from '@/components/patient-data/past-psych-history/change-layer/past-psych-history-add.vue'

export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    pastPsychHistoryEdit,
    pastPsychHistoryAdd,
  },
  mounted() {
    const status = pastPsychHistoryTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
      console.log(this.rowIdForEdit)
    }
  },
}
</script>
