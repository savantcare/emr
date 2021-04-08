<template>
  <div v-if="cfGetRowIdForEdit > 0">
    <temperatureEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <temperatureAdd />
  </div>
</template>

<script>
import temperatureTbl from '@/components/patient-data/temperature/db/client-side/structure/temperature-of-a-patient-table.js'
import temperatureEdit from '@/components/patient-data/temperature/change-layer/edit-design-1.vue'
import temperatureAdd from '@/components/patient-data/temperature/change-layer/add-temperature.vue'
export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    temperatureEdit,
    temperatureAdd,
  },
  mounted() {
   
  },
  computed: {
    cfGetRowIdForEdit(){
      const status = temperatureTbl.isThereSavedPresentDataInTable()
      if (status) {
        this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
      }
      return this.rowIdForEdit
    },
  },
}
</script>
