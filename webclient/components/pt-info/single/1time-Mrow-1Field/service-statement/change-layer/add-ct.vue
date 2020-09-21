<template>
  <div>
    <el-input placeholder="Please input" v-model="userTypedKeyword" />
    <div v-for="group in cfGetArOfGroupNames" :key="group.id">
      {{ group.name }}
      <div class="grid-container">
        <div
          v-for="ss in mfArOfServiceStatementForDisplay(group)"
          :key="ss.serviceStatementMasterId"
        >
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
    cfGetArOfGroupNames() {
      let ar = [
        {
          id: 1,
          name: 'Time in psychotherapy',
        },
        {
          id: 2,
          name: 'Modality of Psychotherapy',
        },
      ]
      return ar
    },
  },
  methods: {
    mfArOfServiceStatementForDisplay(pGroupName) {
      const arOfObjectsFromClientSideDB = ClientSideTblMasterServiceStatements.query()
        .with('tblServiceStatementsForPatientLink')
        .where('ROW_END', 2147483647.999999)
        .where('serviceStatementCategory', pGroupName.name)
        .get()

      console.log(arOfObjectsFromClientSideDB)

      const newObj = arOfObjectsFromClientSideDB.filter(
        (x) =>
          x.serviceStatementDescription.includes(this.userTypedKeyword) ||
          x.serviceStatementCategory.includes(this.userTypedKeyword)
      )
      return newObj
    },

    mfValid(pSS) {
      if (pSS.tblServiceStatementsForPatientLink) {
        if (pSS.tblServiceStatementsForPatientLink.ROW_END === 2147483647.999999) {
          return true
        }
      }
      return false
    },
    mfToggleServiceStatement(pServiceStatementMasterId) {
      const exists = ClientSideTblPatientServiceStatements.query()
        .where('serviceStatementMasterId', pServiceStatementMasterId)
        .where('ROW_END', 2147483647.999999)
        .get()
      if (exists.length > 0) {
        ClientSideTblPatientServiceStatements.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            ROW_END: Math.floor(Date.now() / 1000),
          },
        })
      } else {
        ClientSideTblPatientServiceStatements.insert({
          data: {
            serviceStatementMasterId: pServiceStatementMasterId,
          },
        })
      }
    },
  },
  async mounted() {},
}
</script>
