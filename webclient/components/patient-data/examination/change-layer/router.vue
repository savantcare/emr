<template>
  <div v-if="rowIdForEdit > 0">
    <examinationEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <examinationAdd />
  </div>
</template>

<script>
import examinationTbl from '@/components/patient-data/examination/db/client-side/structure/examination-of-a-patient-table.js'
import examinationEdit from '@/components/patient-data/examination/change-layer/examination-edit-design.vue'
import examinationAdd from '@/components/patient-data/examination/change-layer/add-examination.vue'

export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    examinationEdit,
    examinationAdd,
  },
  mounted() {
    const status = examinationTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
    }
  },
}
</script>
