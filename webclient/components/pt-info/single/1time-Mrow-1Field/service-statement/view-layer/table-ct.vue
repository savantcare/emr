<template>
  <div>
    <div class="grid-container">
      <div v-for="ss in cfArOfServiceStatementForDisplay" :key="ss.serviceStatementMasterId">
        <el-button @click="mfToggleServiceStatement(ss.serviceStatementMasterId)">{{
          ss.serviceStatementMasterId
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ClientSideTblMasterServiceStatements from '../db/client-side/structure/table-master-list-of-service-statements.js'
import ClientSideTblPatientServiceStatements from '../db/client-side/structure/table-service-statements-of-a-patient.js'

export default {
  computed: {
    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = ClientSideTblPatientServiceStatements.all()
      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    mfToggleServiceStatement(pServiceStatementUuid) {
      console.log(pServiceStatementUuid)
      ClientSideTblPatientServiceStatements.insert({
        data: {
          serviceStatementMasterId: pServiceStatementUuid,
        },
      })
    },
  },
  async mounted() {},
}
</script>
