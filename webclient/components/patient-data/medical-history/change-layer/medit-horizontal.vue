<!-- Reference implementation -->

<template>
  <div>
    <div v-for="(mh, index) in daUniqueIdOfEachRowFromOrm" :key="index">
      <el-card>
        <!-- For diff types of formType see mhcl/edit-design-1.vue -->
        <ctChangeMh :first-prop="mh['clientSideUniqRowId']" form-type="embedded" />
      </el-card>
    </div>
  </div>
</template>
<script>
import clientTbl from '../db/client-side/structure/medical-history-of-a-patient-table.js'
import ctChangeMh from './fh-edit.vue'
export default {
  components: { ctChangeMh },
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
