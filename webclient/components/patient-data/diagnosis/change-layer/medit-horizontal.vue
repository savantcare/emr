<!-- Reference implementation -->

<template>
  <div>
    <div v-for="(diagnosis, index) in daUniqueIdOfEachRowFromOrm" :key="index">
      <el-card>
        <ctChangeDiagnosis :first-prop="diagnosis['clientSideUniqRowId']" form-type="embedded"></ctChangeDiagnosis>
      </el-card>
    </div>
  </div>
</template>
<script>
import clientTbl from '../db/client-side/structure/diagnosis-of-a-patient-table.js'
import ctChangeDiagnosis from './diagnosis-edit.vue'
export default {
  components: { ctChangeDiagnosis },
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