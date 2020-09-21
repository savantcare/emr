<template>
  <div>
    <el-input placeholder="Filter text" v-model="userTypedKeyword" />
    <div
      v-for="(allServiceStatementsInsideAGroup,
      groupNameGivenAsIndex) in cfGetMasterListOfServiceStatementsGrouped"
      :key="allServiceStatementsInsideAGroup.id"
    >
      {{ groupNameGivenAsIndex }}
      <div class="grid-container">
        <div v-for="ss in allServiceStatementsInsideAGroup" :key="ss.serviceStatementMasterId">
          <div v-if="mfCheckIfThisExistsInChildTable(ss)">
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
    cfGetMasterListOfServiceStatementsGrouped() {
      console.log('cf called')
      let arOfObjectsFromClientSideMasterDB = ClientSideTblMasterServiceStatements.query()
        .with('tblServiceStatementsForPatientLink')
        .where('ROW_END', 2147483647.999999)
        .where((_record, query) => {
          query
            .where('serviceStatementCategory', (value) =>
              value.toLowerCase().includes(this.userTypedKeyword.toLowerCase())
            )
            .orWhere('serviceStatementDescription', (value) =>
              value.toLowerCase().includes(this.userTypedKeyword.toLowerCase())
            )
        })
        .get()

      // Apply rules given by doctors

      // Rule1: If one "Modality of Psychotherapy" exists PatientServiceStatements table then do not show others
      arOfObjectsFromClientSideMasterDB = this.mfApplyRuleOnServiceStatements(
        arOfObjectsFromClientSideMasterDB,
        'Modality of Psychotherapy'
      )

      // Rule2: If one Time in psychotherapy then do not show others
      arOfObjectsFromClientSideMasterDB = this.mfApplyRuleOnServiceStatements(
        arOfObjectsFromClientSideMasterDB,
        'Time in psychotherapy'
      )

      // Rule3: If one Time in psychotherapy then do not show others
      arOfObjectsFromClientSideMasterDB = this.mfApplyRuleOnServiceStatements(
        arOfObjectsFromClientSideMasterDB,
        'Total time with patient'
      )

      // End: Now group the SS

      const ar = this.groupBy(arOfObjectsFromClientSideMasterDB, 'serviceStatementCategory')

      // console.log(ar)
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
    mfCheckIfThisExistsInChildTable(pSS) {
      // I am able to get the data from child table.
      if (pSS.tblServiceStatementsForPatientLink) {
        if (pSS.tblServiceStatementsForPatientLink.ROW_END === 2147483647.999999) {
          return true
        }
      }
      return false
    },
    async mfToggleServiceStatement(pServiceStatementMasterId) {
      const exists = await ClientSideTblPatientServiceStatements.query()
        .where('serviceStatementMasterId', pServiceStatementMasterId)
        .where('ROW_END', 2147483647.999999)
        .get()
      if (exists.length > 0) {
        await ClientSideTblPatientServiceStatements.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            ROW_END: Math.floor(Date.now() / 1000),
          },
        })
      } else {
        await ClientSideTblPatientServiceStatements.insert({
          data: {
            serviceStatementMasterId: pServiceStatementMasterId,
          },
        })
      }
    },
    mfApplyRuleOnServiceStatements(arOfObjectsFromClientSideMasterDB, serviceStatementCategory) {
      let modalityOfPsychotherapyExists = ClientSideTblPatientServiceStatements.query()
        .with('tblServiceStatementsMasterLink')
        .whereHas('tblServiceStatementsMasterLink', (query) => {
          query.where('serviceStatementCategory', serviceStatementCategory)
        })
        .where('ROW_END', 2147483647.999999)
        .get()

      console.log('arOfObjectsFromClientSideMasterDB', arOfObjectsFromClientSideMasterDB)

      if (modalityOfPsychotherapyExists.length > 0) {
        for (let i = 0; i < arOfObjectsFromClientSideMasterDB.length; i++) {
          if (
            arOfObjectsFromClientSideMasterDB[i].serviceStatementCategory ===
            serviceStatementCategory
          ) {
            if (
              arOfObjectsFromClientSideMasterDB[i].tblServiceStatementsForPatientLink !== null &&
              arOfObjectsFromClientSideMasterDB[i].tblServiceStatementsForPatientLink.ROW_END ==
                '2147483647.999999'
            ) {
              console.log('row is there in client table.')
            } else {
              console.log(
                'delete the row category=Modality of psychotherapy from array of SS allowed to be chosen by patient'
              )
              arOfObjectsFromClientSideMasterDB.splice(i, 1)
              i = i - 1
            }
          }
        }
      }
      return arOfObjectsFromClientSideMasterDB
    },
  },
}
</script>
