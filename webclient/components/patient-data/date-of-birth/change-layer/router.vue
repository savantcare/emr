<template>
  <div v-if="rowIdForEdit > 0">
    <el-divider>Edit</el-divider>
    <dateOfBirthEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <dateOfBirthAdd />
  </div>
</template>

<script>
import dateOfBirthTbl from '@/components/patient-data/date-of-birth/db/client-side/structure/date-of-birth-of-a-patient-table.js'
import dateOfBirthEdit from '@/components/patient-data/date-of-birth/change-layer/edit-design-1.vue'
import dateOfBirthAdd from '@/components/patient-data/date-of-birth/change-layer/add-date-of-birth.vue'

export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    dateOfBirthEdit,
    dateOfBirthAdd,
  },
  mounted() {
    const status = dateOfBirthTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
    }
  },
}
</script>
