<!-- Reference implementation -->

<template>
  <div>
    <div v-for="(pc, index) in daUniqueIdOfEachRowFromOrm" :key="index">
      <el-card>
        <!-- For diff types of formType see pccl/edit-design-1.vue -->
        <ctChangePc :first-prop="pc['clientSideUniqRowId']" form-type="embedded"></ctChangePc>
      </el-card>
    </div>
  </div>
</template>
<script>
import clientTbl from '../db/client-side/structure/plan-comments-of-a-patient-table.js'
import ctChangePc from './edit-design-1.vue'
export default {
  components: { ctChangePc },
  data() {
    return {}
  },
  computed: {
    daUniqueIdOfEachRowFromOrm() {
      let daUniqueIdOfEachRowFromOrm = new Array()
      const resultArFromOrm = clientTbl.fnGetAllRowsPossibleToEdit()
      // console.log(resultArFromOrm)
      return resultArFromOrm
    },
  },
  mounted() {},
}
</script>
