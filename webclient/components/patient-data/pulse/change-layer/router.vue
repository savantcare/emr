<template>
  <div v-if="rowIdForEdit > 0">
    <pulseEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <pulseAdd />
  </div>
</template>

<script>
import pulseTbl from '@/components/patient-data/pulse/db/client-side/structure/pulse-of-a-patient-table.js'
import pulseEdit from '@/components/patient-data/pulse/change-layer/edit-design-1.vue'
import pulseAdd from '@/components/patient-data/pulse/change-layer/add-pulse.vue'
export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    pulseEdit,
    pulseAdd,
  },
  mounted() {
    const status = pulseTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
    }
  },
}
</script>
