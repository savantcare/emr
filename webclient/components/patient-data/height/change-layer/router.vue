<template>
  <div v-if="cfGetRowIdForEdit > 0">
    <heightEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <heightAdd />
  </div>
</template>

<script>
import heightTbl from '@/components/patient-data/height/db/client-side/structure/height-of-a-patient-table.js'
import heightEdit from '@/components/patient-data/height/change-layer/edit-design-1.vue'
import heightAdd from '@/components/patient-data/height/change-layer/add-height.vue'

export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    heightEdit,
    heightAdd,
  },
  mounted() {
   
  },
  computed: {
    cfGetRowIdForEdit(){
      const status = heightTbl.isThereSavedPresentDataInTable()
      if (status) {
        this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
      }
      return this.rowIdForEdit
    },
  },
}
</script>
