<!-- Reference implementation -->

<template>
  <div v-if="daUniqueIdOfEachRowFromOrm.length > 0" class="block">
    <el-card>
      <!-- For diff types of formType see remcl/edit-design-1.vue -->
      <ctChangeRem :first-prop="daUniqueIdOfEachRowFromOrm.clientSideUniqRowId" form-type="embedded"></ctChangeRem>
    </el-card>
  </div>
  <div v-else><el-alert title="No reminder found." type="info" show-icon> </el-alert></div>
</template>
<script>
import clientTbl from '../db/client-side/structure/reminders-of-a-patient-table.js'
import ctChangeRem from './reminder-edit.vue'
export default {
  components: { ctChangeRem },
  data() {
    return {}
  },
  computed: {
    console: () => console, // Ref: https://stackoverflow.com/questions/51080447/
    daUniqueIdOfEachRowFromOrm() {
      let daUniqueIdOfEachRowFromOrm = new Array()
      const resultArFromOrm = clientTbl.fnGetAllRowsPossibleToEdit()
      console.log(resultArFromOrm)
      return resultArFromOrm
    },
  },
  mounted() {},
}
</script>
