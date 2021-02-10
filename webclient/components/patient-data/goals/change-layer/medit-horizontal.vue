<!-- Reference implementation -->

<template>
  <div>
    <div v-for="(goal, index) in daUniqueIdOfEachRowFromOrm" :key="index">
      <el-card>
        <ctChangeGoal :first-prop="goal['clientSideUniqRowId']" form-type="embedded"></ctChangeGoal>
      </el-card>
    </div>
  </div>
</template>
<script>
import clientTbl from '../db/client-side/structure/goals-of-a-patient-table.js'
import ctChangeGoal from './goal-edit.vue'
export default {
  components: { ctChangeGoal },
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
