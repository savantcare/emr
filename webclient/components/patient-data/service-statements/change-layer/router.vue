<template>
  <div v-if="rowIdForEdit > 0">
    <serviceStatementsEdit :_rowIdForEdit="rowIdForEdit" :key="rowIdForEdit" />
  </div>
  <div v-else>
    <serviceStatementsAdd />
  </div>
</template>

<script>
import serviceStatementsTbl from '@/components/patient-data/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'
import serviceStatementsEdit from '@/components/patient-data/service-statements/change-layer/ss-edit-design-1.vue'
import serviceStatementsAdd from '@/components/patient-data/service-statements/change-layer/add-ss.vue'

export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    serviceStatementsEdit,
    serviceStatementsAdd,
  },
  mounted() {
    const status = serviceStatementsTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
    }
  },
}
</script>
