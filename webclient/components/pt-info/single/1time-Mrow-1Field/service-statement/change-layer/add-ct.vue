<template>
  <div>
    <el-input placeholder="Please input" v-model="userTypedKeyword" />
    <div class="grid-container">
      <div v-for="ss in cfArOfServiceStatementForDisplay" :key="ss.id">
        <el-button @click="mfToggleServiceStatement(ss.clientSideRowId)">{{
          ss.serviceStatementDescription
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ClientSideTblMasterServiceStatement from '../db/client-side/structure/table-master-list-of-ss.js'
import ClientSideTblPatientServiceStatement from '../db/client-side/structure/table-ss-of-a-patient.js'

export default {
  data() {
    return {
      userTypedKeyword: '',
    }
  },
  computed: {
    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = ClientSideTblMasterServiceStatement.fnGetValidUniqueUuidNotEmptyRows(
        'serviceStatementDescription'
      )
      const newObj = arOfObjectsFromClientSideDB.filter((x) =>
        x.serviceStatementDescription.includes(this.userTypedKeyword)
      )
      return newObj
    },
  },
  methods: {
    mfToggleServiceStatement(pServiceStatementId) {
      console.log(pServiceStatementId)
      ClientSideTblPatientServiceStatement.insert({
        data: {
          serverSideRowUuid: '2',
          serviceStatementDescription: 'Spent 15 mins with patient',
        },
      })
    },
  },
  async mounted() {},
}
</script>
