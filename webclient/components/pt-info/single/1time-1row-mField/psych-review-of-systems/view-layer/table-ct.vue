<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Psych review of systems</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="mfOpenCCtInCl"
          >C</el-button
        >
      </div>
      <div class="grid-container">
        <div v-for="ss in cfArOfServiceStatementForDisplay" :key="ss.clientSideUniqRowId">
          <el-button @click="mfDiscontinueServiceStatement(ss.clientSideUniqRowId)" type="primary"
            >{{ ss.tblPsychReviewOfSystemsMasterLink.psychReviewOfSystemsCategory }}:
            {{ ss.tblPsychReviewOfSystemsMasterLink.psychReviewOfSystemsDescription }}</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import clientSideTblMasterPsychReviewOfSystems from '../db/client-side/structure/table-master-list-of-psych-review-of-systems.js'
import clientSideTblPatientPsychReviewOfSystems from '../db/client-side/structure/table-psych-review-of-systems-of-a-patient.js'

export default {
  computed: {
    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblPatientPsychReviewOfSystems
        .query()
        .with('tblPsychReviewOfSystemsMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()
      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    mfDiscontinueServiceStatement(pClientSideUniqRowId) {
      clientSideTblPatientPsychReviewOfSystems.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },
    mfOpenCCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'change psych review of systems',
      })
    },
  },
  async mounted() {},
}
</script>
