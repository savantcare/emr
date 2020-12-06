<template>
  <div v-if="rowIdForEdit > 0">
    Edit social history
    <socialHistoryEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <socialHistoryAdd />
  </div>
</template>

<script>
import socialHistoryTbl from '@/components/patient-data/social-history/db/client-side/structure/social-history-of-a-patient-table.js'
import socialHistoryEdit from '@/components/patient-data/social-history/change-layer/edit-design-1.vue'
import socialHistoryAdd from '@/components/patient-data/social-history/change-layer/add-ct.vue'

export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    socialHistoryEdit,
    socialHistoryAdd,
  },
  mounted() {
    const status = socialHistoryTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
      console.log(this.rowIdForEdit)
    }
  },
}
</script>
