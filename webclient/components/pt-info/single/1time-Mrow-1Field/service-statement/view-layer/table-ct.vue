<template>
  <div>
    <div class="grid-container">
      <div v-for="ss in cfArOfServiceStatementForDisplay" :key="ss.id">
        <el-button @click="mfToggleServiceStatement(ss.serverSideRowUuid)">{{
          ss.serverSideRowUuid
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
      const arOfObjectsFromClientSideDB = ClientSideTblPatientServiceStatements.fnGetValidUniqueUuidNotEmptyRows(
        'serverSideRowUuid'
      )
      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    mfToggleServiceStatement(pServiceStatementUuid) {
      console.log(pServiceStatementUuid)
      ClientSideTblPatientServiceStatements.insert({
        data: {
          serverSideRowUuid: pServiceStatementUuid,
        },
      })
    },
  },
  async mounted() {},
}
</script>
