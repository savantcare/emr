<template>
  <div v-if="rowIdForEdit > 0">
    <weightEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <weightAdd />
  </div>
</template>

<script>
import weightTbl from '@/components/patient-data/weight/db/client-side/structure/weight-of-a-patient-table.js'
import weightEdit from '@/components/patient-data/weight/change-layer/edit-design-1.vue'
import weightAdd from '@/components/patient-data/weight/change-layer/add-weight.vue'

export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    weightEdit,
    weightAdd,
  },
  mounted() {
    const status = weightTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
    }
  },
}
</script>
