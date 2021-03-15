<template>
  <div v-if="rowIdForEdit > 0">
    Edit allergies
    <allergiesEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <allergiesAdd />
  </div>
</template>

<script>
import allergiesTbl from '@/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import allergiesPresentClientTbl from '@/components/patient-data/allergies/db/client-side/structure/allergies-present-of-a-patient-table.js'
import allergiesEdit from '@/components/patient-data/allergies/change-layer/allergy-edit.vue'
import allergiesAdd from '@/components/patient-data/allergies/change-layer/allergy-add.vue'

export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    allergiesEdit,
    allergiesAdd,
  },
  mounted() {
    const allergiesPresentStatus = allergiesPresentClientTbl.isThereSavedPresentDataInTable()
    if (allergiesPresentStatus) {
      this.rowIdForEdit = allergiesPresentStatus[allergiesPresentStatus.length - 1]['clientSideUniqRowId']
    }
    const allergiesStatus = allergiesTbl.isThereSavedPresentDataInTable()
  },
}
</script>
