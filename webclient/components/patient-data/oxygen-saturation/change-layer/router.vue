<template>
  <div v-if="cfGetRowIdForEdit > 0">
    <oxygenSaturationEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <oxygenSaturationAdd />
  </div>
</template>

<script>
import oxygenSaturationTbl from '@/components/patient-data/oxygen-saturation/db/client-side/structure/oxygen-saturation-of-a-patient-table.js'
import oxygenSaturationEdit from '@/components/patient-data/oxygen-saturation/change-layer/edit-design-1.vue'
import oxygenSaturationAdd from '@/components/patient-data/oxygen-saturation/change-layer/add-oxygen-saturation.vue'
export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    oxygenSaturationEdit,
    oxygenSaturationAdd,
  },
  mounted() {
   
  },
  computed: {
    cfGetRowIdForEdit(){
      const status = oxygenSaturationTbl.isThereSavedPresentDataInTable()
      if (status) {
        this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
      }
      return this.rowIdForEdit
    },
  },
}
</script>
