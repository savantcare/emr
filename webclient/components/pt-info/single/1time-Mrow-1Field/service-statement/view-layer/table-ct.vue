<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Service statemetns</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="mfOpenACtInCl"
          >A</el-button
        >
      </div>
      <div class="grid-container">
        <div v-for="ss in cfArOfServiceStatementForDisplay" :key="ss.clientSideUniqRowId">
          <el-button @click="mfDiscontinueServiceStatement(ss.clientSideUniqRowId)" type="primary"
            >{{ ss.tblServiceStatementsMasterLink.serviceStatementCategory }}:
            {{ ss.tblServiceStatementsMasterLink.serviceStatementDescription }}</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import clientSideTblMasterServiceStatements from '../db/client-side/structure/table-master-list-of-service-statements.js'
import clientSideTblPatientServiceStatements from '../db/client-side/structure/table-service-statements-of-a-patient.js'

export default {
  computed: {
    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblPatientServiceStatements
        .query()
        .with('tblServiceStatementsMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()
      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    mfDiscontinueServiceStatement(pClientSideUniqRowId) {
      clientSideTblPatientServiceStatements.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },
    mfOpenACtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'add service statement',
      })
    },
  },
  async mounted() {},
}
</script>
