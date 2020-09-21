<template>
  <div>
    <div class="grid-container">
      <div v-for="ss in cfArOfServiceStatementForDisplay" :key="ss.clientSideUniqRowId">
        <el-button @click="mfDiscontinueServiceStatement(ss.clientSideUniqRowId)" type="primary">{{
          ss.serviceStatementsMaster.serviceStatementDescription
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
      const arOfObjectsFromClientSideDB = ClientSideTblPatientServiceStatements.query()
        .with('serviceStatementsMaster')
        .where('ROW_END', 2147483647.999999)
        .get()
      console.log(arOfObjectsFromClientSideDB)
      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    mfDiscontinueServiceStatement(pClientSideUniqRowId) {
      ClientSideTblPatientServiceStatements.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },
  },
  async mounted() {},
}
</script>
