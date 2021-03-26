<!-- Reference implementation -->

<template>
  <div>
    <div v-for="(pn, index) in daUniqueIdOfEachRowFromOrm" :key="index">
      <el-card>
        <!-- For diff types of formType see remcl/edit-design-1.vue -->
        <ctChangeRem :first-prop="pn['clientSideUniqRowId']" form-type="embedded"></ctChangeRem>
      </el-card>
    </div>
  </div>
</template>
<script>
import clientTbl from '../db/client-side/structure/process-notes-of-a-patient-table.js'
import ctChangeRem from './edit-design-1.vue'
export default {
  components: { ctChangeRem },
  data() {
    return {}
  },
  computed: {
    // console: () => console, // Ref: https://stackoverflow.com/questions/51080447/
    daUniqueIdOfEachRowFromOrm() {
      const resultArFromOrm = clientTbl.fnGetAllRowsPossibleToEdit()
      return resultArFromOrm
    },
  },
  mounted() {},
}
</script>
