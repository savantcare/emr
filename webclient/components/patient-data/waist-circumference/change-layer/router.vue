<template>
  <div v-if="cfGetRowIdForEdit > 0">
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
   
  },
  computed: {
    cfGetRowIdForEdit(){
      const status = waistCircumferenceTbl.isThereSavedPresentDataInTable()
      if (status) {
        this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
      }
      return this.rowIdForEdit
    },
  },
}
</script>
