<template>
  <div v-if="rowIdForEdit > 0">
    <el-divider>Edit</el-divider>
    <chiefComplainEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <chiefComplainAdd />
  </div>
</template>

<script>
import chiefComplainTbl from '@/components/patient-data/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'
import chiefComplainEdit from '@/components/patient-data/chief-complaint/change-layer/edit-design-1.vue'
import chiefComplainAdd from '@/components/patient-data/chief-complaint/change-layer/add-chief-complaint.vue'

export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    chiefComplainEdit,
    chiefComplainAdd,
  },
  mounted() {
    const status = chiefComplainTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
    }
  },
}
</script>
