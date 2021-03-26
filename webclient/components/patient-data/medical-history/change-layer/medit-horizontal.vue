<!-- Reference implementation -->

<template>
  <div>
    <div v-for="(mh, index) in daUniqueIdOfEachRowFromOrm" :key="index">
      <el-card>
        <!-- For diff types of formType see mhcl/edit-design-1.vue -->
        <ctChangemh :first-prop="mh['clientSideUniqRowId']" form-type="embedded" />
      </el-card>
    </div>
  </div>
</template>
<script>
import clientTbl from '../db/client-side/structure/medical-history-of-a-patient-table.js'
import ctChangemh from './fh-edit.vue'
export default {
  components: { ctChangemh },
  data() {
    return {}
  },
  computed: {
    // console: () => console, // Ref: https://stackoverflow.com/questions/51080447/
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
