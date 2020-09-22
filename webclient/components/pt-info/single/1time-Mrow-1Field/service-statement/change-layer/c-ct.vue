<template>
  <div>
    <el-input placeholder="Filter text" v-model="userTypedKeyword" />
    <div
      v-for="(allServiceStatementsInsideAGroup,
      groupNameGivenAsIndex) in cfGetMasterListOfServiceStatementsGrouped"
      :key="allServiceStatementsInsideAGroup.id"
    >
      {{ groupNameGivenAsIndex }}
      <div class="sc-service-statement-all-content-body">
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
import clientSideTblMasterServiceStatements from '../db/client-side/structure/table-master-list-of-service-statements.js'
import clientSideTblPatientServiceStatements from '../db/client-side/structure/table-service-statements-of-a-patient.js'

export default {
  data() {
    return {
      userTypedKeyword: '',
    }
  },
  computed: {
    cfGetMasterListOfServiceStatementsGrouped() {
      console.log('cf called')
      let arOfObjectsFromClientSideMasterDB = clientSideTblMasterServiceStatements
        .query()
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
      arOfObjectsFromClientSideMasterDB = this.mfApplyOneEntryRuleOnServiceStatementCategory(
        arOfObjectsFromClientSideMasterDB,
        'Modality of Psychotherapy'
      )

      // Rule2: If one Time in psychotherapy then do not show others
      arOfObjectsFromClientSideMasterDB = this.mfApplyOneEntryRuleOnServiceStatementCategory(
        arOfObjectsFromClientSideMasterDB,
        'Total minutes in psychotherapy'
      )

      // Rule3: If one Time in psychotherapy then do not show others
      arOfObjectsFromClientSideMasterDB = this.mfApplyOneEntryRuleOnServiceStatementCategory(
        arOfObjectsFromClientSideMasterDB,
        'Total minutes with patient'
      )

      // Rule 4: If "total time in psychotherapy" has been chosen to be N. Then "from total minutes with patient" remove elements that are less than N

      // Rule 5: If "total minutes with patient" has been chosen to be N. Then "from total time in psychotherapy" remove elements that are greater than N

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
    mfToggleServiceStatement(pServiceStatementMasterId) {
      const exists = clientSideTblPatientServiceStatements
        .query()
        .where('serviceStatementMasterId', pServiceStatementMasterId)
        .where('ROW_END', 2147483647.999999)
        .get()
      if (exists.length > 0) {
        clientSideTblPatientServiceStatements.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            ROW_END: Math.floor(Date.now() / 1000),
          },
        })
      } else {
        clientSideTblPatientServiceStatements.insert({
          data: {
            serviceStatementMasterId: pServiceStatementMasterId,
          },
        })
      }
    },

    mfApplyOneEntryRuleOnServiceStatementCategory(
      pArOfObjectsFromClientSideMasterDB,
      pServiceStatementCategoryToApplyRuleOn
    ) {
      let elementsOfThisSetAlreadyAssignedToPatient = clientSideTblPatientServiceStatements
        .query()
        .with('tblServiceStatementsMasterLink')
        .whereHas('tblServiceStatementsMasterLink', (query) => {
          query.where('serviceStatementCategory', pServiceStatementCategoryToApplyRuleOn)
        })
        .where('ROW_END', 2147483647.999999)
        .get()
      if (elementsOfThisSetAlreadyAssignedToPatient.length > 0) {
        for (let i = 0; i < pArOfObjectsFromClientSideMasterDB.length; i++) {
          if (
            pArOfObjectsFromClientSideMasterDB[i].serviceStatementCategory ===
            pServiceStatementCategoryToApplyRuleOn
          ) {
            // master list has 10 entries. Once the category has matched there are 2 possibilityes. P1: This element is there in SS  of patient P2: This element is not there in SS of patient
            if (
              // Handling Possibility 1:  This element is there in SS of patient
              pArOfObjectsFromClientSideMasterDB[i].tblServiceStatementsForPatientLink !== null &&
              pArOfObjectsFromClientSideMasterDB[i].tblServiceStatementsForPatientLink.ROW_END ==
                '2147483647.999999'
            ) {
            } else {
              // Handling Possibility 2: This element is not there in SS of patient
              pArOfObjectsFromClientSideMasterDB.splice(i, 1)
              i = i - 1
            }
          }
        }
      }
      return pArOfObjectsFromClientSideMasterDB
    },
  },
}
</script>

<style>
.sc-service-statement-all-content-body {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* Some other grid-template-columns options are :
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fit, max(200px)); compared to minmax(200px, 1fr) there is more magin between cols and less content fits.
  */
  grid-gap: 1px;
  grid-auto-flow: row; /* This is default value */
  margin: 1px;
}
</style>
