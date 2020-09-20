<template>
  <div>
    <el-input placeholder="Please input" v-model="userTypedKeyword" />
    <div class="grid-container">
      <div v-for="ss in cfArOfServiceStatementForDisplay" :key="ss.id">
        <el-button @click="mfToggleServiceStatement(ss.serverSideRowUuid)">{{
          ss.serviceStatementDescription
        }}</el-button>
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
      const arOfObjectsFromClientSideDB = ClientSideTblMasterServiceStatements.fnGetValidUniqueUuidNotEmptyRows(
        'serviceStatementDescription'
      )
      const newObj = arOfObjectsFromClientSideDB.filter((x) =>
        x.serviceStatementDescription.includes(this.userTypedKeyword)
      )
      return newObj
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
