<template>
  <div v-if="rowIdForEdit > 0">
    <waistCircumferenceEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <waistCircumferenceAdd />
  </div>
</template>

<script>
import waistCircumferenceTbl from '@/components/patient-data/waist-circumference/db/client-side/structure/waist-circumference-of-a-patient-table.js'
import waistCircumferenceEdit from '@/components/patient-data/waist-circumference/change-layer/edit-design-1.vue'
import waistCircumferenceAdd from '@/components/patient-data/waist-circumference/change-layer/add-waist-circumference.vue'
export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    waistCircumferenceEdit,
    waistCircumferenceAdd,
  },
  mounted() {
    const status = waistCircumferenceTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
    }
  },
}
</script>
