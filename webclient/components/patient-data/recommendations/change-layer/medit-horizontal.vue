<!-- Reference implementation -->
<template>
  <div>
    <div v-for="(rex, index) in daUniqueIdOfEachRowFromOrm" :key="index">
      <el-card>
        <!-- For diff types of formType see remcl/edit-design-1.vue -->
        <ctChangeRex :first-prop="rex['clientSideUniqRowId']" form-type="embedded" />
      </el-card>
    </div>
  </div>
</template>
<script>
import clientTbl from '@/components/patient-data/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'
import ctChangeRex from '@/components/patient-data/recommendations/change-layer/edit-design-1.vue'
export default {
  components: { ctChangeRex },
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
