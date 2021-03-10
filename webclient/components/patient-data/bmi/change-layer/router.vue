<template>
  <div v-if="rowIdForEdit > 0">
    <bmiEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <bmiAdd />
  </div>
</template>

<script>
import bmiTbl from '@/components/patient-data/bmi/db/client-side/structure/bmi-of-a-patient-table.js'
import bmiEdit from '@/components/patient-data/bmi/change-layer/edit-design-1.vue'
import bmiAdd from '@/components/patient-data/bmi/change-layer/add-bmi.vue'
export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    bmiEdit,
    bmiAdd,
  },
  mounted() {
    const status = bmiTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
    }
  },
}
</script>
