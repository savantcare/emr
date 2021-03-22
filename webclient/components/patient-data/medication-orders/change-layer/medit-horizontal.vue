<!-- Reference implementation -->

<template>
  <div>
    <div v-for="(medicationOrder, index) in daUniqueIdOfEachRowFromOrm" :key="index">
      <el-card>
        <ctChangeMedicationOrder :first-prop="medicationOrder['clientSideUniqRowId']" form-type="embedded"></ctChangeMedicationOrder>
      </el-card>
    </div>
  </div>
</template>
<script>
import clientTbl from '../db/client-side/structure/medication-order-of-a-patient-table.js'
import ctChangeMedicationOrder from './medication-order-edit.vue'
export default {
  components: { ctChangeMedicationOrder },
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