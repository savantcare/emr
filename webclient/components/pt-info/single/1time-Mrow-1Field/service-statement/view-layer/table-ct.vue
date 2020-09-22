<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Service statements</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="mfOpenCCtInCl"
          icon="el-icon-edit"
        ></el-button>
      </div>
      <div class="grid-container">
        <div v-for="ss in cfArOfServiceStatementForDisplay" :key="ss.clientSideUniqRowId">
          <el-button @click="mfDeleteServiceStatement(ss.clientSideUniqRowId)" type="primary"
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
    mfDeleteServiceStatement(pClientSideUniqRowId) {
      clientSideTblPatientServiceStatements.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },
    mfOpenCCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'change service statement',
      })
    },
  },
  async mounted() {},
}
</script>
