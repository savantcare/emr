<template>
  <div>
    <el-input placeholder="Please input" v-model="userTypedKeyword" />
    <div class="grid-container">
      <div v-for="ss in cfArOfServiceStatementForDisplay" :key="ss.masterRowId">
        <el-button @click="mfToggleServiceStatement(ss.masterRowId)">{{
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
      const arOfObjectsFromClientSideDB = ClientSideTblMasterServiceStatements.all()
      const newObj = arOfObjectsFromClientSideDB.filter((x) =>
        x.serviceStatementDescription.includes(this.userTypedKeyword)
      )
      return newObj
    },
  },
  methods: {
    mfToggleServiceStatement(pMasterRowId) {
      console.log(pMasterRowId)
      ClientSideTblPatientServiceStatements.insert({
        data: {
          serviceStatementMasterId: pMasterRowId,
        },
      })
    },
  },
  async mounted() {},
}
</script>
