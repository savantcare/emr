<template>
  <div v-if="rowIdForEdit > 0">
    Edit medical review of systems
    <medicalReviewOfSystemEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <medicalReviewOfSystemAdd />
  </div>
</template>

<script>
import medicalReviewOfSystemTbl from '@/components/patient-data/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'
import medicalReviewOfSystemEdit from '@/components/patient-data/medical-review-of-system/change-layer/mros-edit-design-1.vue'
import medicalReviewOfSystemAdd from '@/components/patient-data/medical-review-of-system/change-layer/add-mros.vue'

export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    medicalReviewOfSystemEdit,
    medicalReviewOfSystemAdd,
  },
  mounted() {
    const status = medicalReviewOfSystemTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
      console.log(this.rowIdForEdit)
    }
  },
}
</script>
