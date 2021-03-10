<template>
  <div v-if="rowIdForEdit > 0">
    <bloodPressureEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <bloodPressureAdd />
  </div>
</template>

<script>
import bloodPressureTbl from '@/components/patient-data/blood-pressure/db/client-side/structure/blood-pressure-of-a-patient-table.js'
import bloodPressureEdit from '@/components/patient-data/blood-pressure/change-layer/edit-design-1.vue'
import bloodPressureAdd from '@/components/patient-data/blood-pressure/change-layer/add-blood-pressure.vue'
export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    bloodPressureEdit,
    bloodPressureAdd,
  },
  mounted() {
    const status = bloodPressureTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
    }
  },
}
</script>
