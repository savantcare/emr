<!-- Reference implementation -->

<template>
  <div>
    <div v-for="(fh, index) in daUniqueIdOfEachRowFromOrm" :key="index">
      <el-card>
        <!-- For diff types of formType see fhcl/edit-design-1.vue -->
        <ctChangeFh :first-prop="fh['clientSideUniqRowId']" form-type="embedded" />
      </el-card>
    </div>
  </div>
</template>
<script>
import clientTbl from '../db/client-side/structure/family-history-of-a-patient-table.js'
import ctChangeFh from './fh-edit.vue'
export default {
  components: { ctChangeFh },
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
