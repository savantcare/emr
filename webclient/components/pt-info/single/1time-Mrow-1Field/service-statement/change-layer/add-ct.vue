<template>
  <div>
    <el-input placeholder="Please input" v-model="userTypedKeyword" />
    <div class="grid-container">
      <div v-for="ss in cfArOfServiceStatementForDisplay" :key="ss.serviceStatementMasterId">
        <div v-if="mfValid(ss)">
          <el-button
            @click="mfToggleServiceStatement(ss.serviceStatementMasterId)"
            type="primary"
            >{{ ss.serviceStatementDescription }}</el-button
          >
        </div>
        <div v-else>
          <el-button @click="mfToggleServiceStatement(ss.serviceStatementMasterId)">{{
            ss.serviceStatementDescription
          }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClientSideTblMasterServiceStatements from '../db/client-side/structure/table-master-list-of-service-statements.js'
import ClientSideTblPatientServiceStatements from '../db/client-side/structure/table-service-statements-of-a-patient.js'

export default {
  data() {
    return {
      userTypedKeyword: '',
    }
  },
  computed: {
    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = ClientSideTblMasterServiceStatements.query()
        .with('serviceStatementsForPatient')
        .where('ROW_END', 2147483647.999999)
        .get()
      console.log(arOfObjectsFromClientSideDB)
      const newObj = arOfObjectsFromClientSideDB.filter((x) =>
        x.serviceStatementDescription.includes(this.userTypedKeyword)
      )
      return newObj
    },
  },
  methods: {
    mfValid(pSS) {
      console.log(pSS)
      if (pSS.serviceStatementsForPatient) {
        if (pSS.serviceStatementsForPatient.ROW_END === '2147483647.999999') {
          return true
        }
      }
      return false
    },
    mfToggleServiceStatement(pServiceStatementMasterId) {
      console.log(pServiceStatementMasterId)
      ClientSideTblPatientServiceStatements.insert({
        data: {
          serviceStatementMasterId: pServiceStatementMasterId,
        },
      })
    },
  },
  async mounted() {},
}
</script>
