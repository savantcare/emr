<template>
  <div>
    <el-input placeholder="Please input" v-model="userTypedKeyword" />
    <div v-for="(group, groupNameGivenAsIndex) in cfGetServiceStatementsGrouped" :key="group.id">
      {{ groupNameGivenAsIndex }}
      <div class="grid-container">
        <div v-for="ss in group" :key="ss.serviceStatementMasterId">
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
    cfGetServiceStatementsGrouped() {
      const arOfObjectsFromClientSideDB = ClientSideTblMasterServiceStatements.query()
        .with('tblServiceStatementsForPatientLink')
        .where('ROW_END', 2147483647.999999)
        .where('serviceStatementCategory', (value) => value.includes(this.userTypedKeyword))
        .orWhere('serviceStatementDescription', (value) => value.includes(this.userTypedKeyword))
        .get()
      console.log(arOfObjectsFromClientSideDB)
      const ar = this.groupBy(arOfObjectsFromClientSideDB, 'serviceStatementCategory')
      console.log(ar)
      return ar
    },
  },
  methods: {
    groupBy(data, key) {
      // Ref: https://gist.github.com/robmathers/1830ce09695f759bf2c4df15c29dd22d
      // `data` is an array of objects, `key` is the key (or property accessor) to group by
      // reduce runs this anonymous function on each element of `data` (the `item` parameter,
      // returning the `storage` parameter at the end
      return data.reduce(function (storage, item) {
        // get the first instance of the key by which we're grouping
        var group = item[key]

        // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
        storage[group] = storage[group] || []

        // add this item to its group within `storage`
        storage[group].push(item)

        // return the updated storage to the reduce function, which will then loop through the next
        return storage
      }, {}) // {} is the initial value of the storage
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
}
</script>
