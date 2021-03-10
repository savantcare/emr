<template>
  <div v-if="rowIdForEdit > 0">
    <bloodSugarEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <bloodSugarAdd />
  </div>
</template>

<script>
import bloodSugarTbl from '@/components/patient-data/blood-sugar/db/client-side/structure/blood-sugar-of-a-patient-table.js'
import bloodSugarEdit from '@/components/patient-data/blood-sugar/change-layer/edit-design-1.vue'
import bloodSugarAdd from '@/components/patient-data/blood-sugar/change-layer/add-blood-sugar.vue'
export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    bloodSugarEdit,
    bloodSugarAdd,
  },
  mounted() {
    const status = bloodSugarTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
    }
  },
}
</script>
