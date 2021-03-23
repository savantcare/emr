<template>
  <div v-if="rowIdForEdit > 0">
    <psychReviewOfSystemEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <psychReviewOfSystemAdd />
  </div>
</template>

<script>
import psychReviewOfSystemTbl from '@/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'
import psychReviewOfSystemEdit from '@/components/patient-data/psych-review-of-system/change-layer/psych-review-of-system-edit.vue'
import psychReviewOfSystemAdd from '@/components/patient-data/psych-review-of-system/change-layer/psych-review-of-system-add.vue'
export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    psychReviewOfSystemEdit,
    psychReviewOfSystemAdd,
  },
  mounted() {
    const status = psychReviewOfSystemTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
    }
  },
}
</script>
