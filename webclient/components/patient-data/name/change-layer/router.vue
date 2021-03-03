<template>
  <div v-if="rowIdForEdit > 0">
    
      <el-card>
        <!-- For diff types of formType see namecl/name-edit-design.vue -->
        <ctChangeName :first-prop="daUniqueIdOfEachRowFromOrm['clientSideUniqRowId']" form-type="embedded"></ctChangeName>
      </el-card>
  </div>
</template>

<script>
import clientTbl from '../db/client-side/structure/name-of-a-patient-table.js'
import ctChangeName from './name-edit-design.vue'
export default {
  data: function () {
    return {
      rowIdForEdit: null,
    }
  },
  components: {
    ctChangeName,
  },
  computed: {
    daUniqueIdOfEachRowFromOrm() {
      let daUniqueIdOfEachRowFromOrm = new Array()
      const resultArFromOrm = clientTbl.fnGetAllRowsPossibleToEdit()
      return resultArFromOrm[0]
    },
  },
  mounted() {
    const status = clientTbl.isThereSavedPresentDataInTable()
    if (status) {
      this.rowIdForEdit = status[status.length - 1]['clientSideUniqRowId']
    }
  },
}
</script>