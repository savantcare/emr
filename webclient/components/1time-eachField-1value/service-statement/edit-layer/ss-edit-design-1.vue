<template>
  <div>
    <el-input placeholder="Filter text" v-model="userTypedKeyword" />
    <div
      v-for="(allServiceStatementsInsideAGroup, groupNameGivenAsIndex) in cfGetMasterRowsOfServiceStatementsGrouped"
      :key="allServiceStatementsInsideAGroup.id"
    >
      {{ groupNameGivenAsIndex }}
      <div class="sc-service-statement-all-content-body">
        <div v-for="ss in allServiceStatementsInsideAGroup" :key="ss.serviceStatementFieldMasterId">
          <div v-if="mfCheckIfThisExistsInChildTable(ss)">
            <el-button @click="mfToggleServiceStatement(ss.serviceStatementFieldMasterId)" type="primary">{{
              ss.serviceStatementFieldDescription
            }}</el-button>
          </div>
          <div v-else>
            <el-button @click="mfToggleServiceStatement(ss.serviceStatementFieldMasterId)">
              {{ ss.serviceStatementFieldDescription }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientSideTblOfMasterServiceStatements from '../db/client-side/structure/master-table-of-service-statements.js'
import clientSideTblOfPatientServiceStatements from '../db/client-side/structure/patient-table-of-service-statements.js'

export default {
  data() {
    return {
      userTypedKeyword: '',
    }
  },
  computed: {
    cfGetMasterRowsOfServiceStatementsGrouped() {
      console.log('cf called')
      let arOfObjectsFromClientMasterDB = clientSideTblOfMasterServiceStatements
        .query()
        .with('tblLinkToServiceStatementForPatientFieldValues')
        .where('ROW_END', 2147483648000)
        .where((_record, query) => {
          query
            .where('serviceStatementFieldCategory', (value) =>
              value.toLowerCase().includes(this.userTypedKeyword.toLowerCase())
            )
            .orWhere('serviceStatementFieldDescription', (value) =>
              value.toLowerCase().includes(this.userTypedKeyword.toLowerCase())
            )
        })
        .get()

      // Apply rules given by doctors

      // Rule1: If one Time in psychotherapy then do not show others
      arOfObjectsFromClientMasterDB = this.mfApplyOneEntryRuleOnServiceStatementFieldCategory(
        arOfObjectsFromClientMasterDB,
        'Total minutes in psychotherapy'
      )

      // Rule2: If one Time in psychotherapy then do not show others
      arOfObjectsFromClientMasterDB = this.mfApplyOneEntryRuleOnServiceStatementFieldCategory(
        arOfObjectsFromClientMasterDB,
        'Total minutes with patient'
      )

      // Rule 3: If "total time in psychotherapy" has been chosen to be N. Then "from total minutes with patient" remove elements that are less than N
      arOfObjectsFromClientMasterDB = this.mfApplyTotalMinutesInPsychotherapyRuleOnServiceStatementFieldCategory(
        arOfObjectsFromClientMasterDB
      )

      // Rule 4: If "total minutes with patient" has been chosen to be N. Then "from total time in psychotherapy" remove elements that are greater than N
      arOfObjectsFromClientMasterDB = this.mfApplyTotalMinutesWithPatientRuleOnServiceStatementFieldCategory(
        arOfObjectsFromClientMasterDB
      )

      // End: Now group the SS

      const ar = this.groupBy(arOfObjectsFromClientMasterDB, 'serviceStatementFieldCategory')

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
      console.log('condition', pSS)
      // I am able to get the data from child table.
      if (pSS.tblLinkToServiceStatementForPatientFieldValues) {
        if (pSS.tblLinkToServiceStatementForPatientFieldValues.ROW_END === 2147483648000) {
          return true
        }
      }
      return false
    },
    async mfToggleServiceStatement(pServiceStatementFieldMasterId) {
      // Goal1: Check if it already exists
      console.log('Field master ID is', pServiceStatementFieldMasterId)
      const exists = clientSideTblOfPatientServiceStatements
        .query()
        .where('serviceStatementFieldMasterId', pServiceStatementFieldMasterId)
        .where('ROW_END', 2147483648000)
        .get()

      if (exists.length > 0) {
        const response = await fetch(
          clientSideTblOfPatientServiceStatements.apiUrl + '/' + exists[0].serverSideRowUuid,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              // "Authorization": "Bearer " + TOKEN
            },
            body: '',
          }
        )
        if (response.status === 200) {
          clientSideTblOfPatientServiceStatements.update({
            where: exists[0].clientSideUniqRowId,
            data: {
              ROW_END: Math.floor(Date.now()),
            },
          })
          this.$notify({
            title: 'Success',
            message: 'Updated on server',
            type: 'success',
            duration: 3000,
          })
        } else {
          this.$notify({
            title: 'Error',
            message: 'Not updated on server',
            type: 'Error',
            duration: 3000,
          })
        }
      } else {
        const clientSideTblOfPatientServiceStatementsRow = await clientSideTblOfPatientServiceStatements.insert({
          data: {
            serviceStatementFieldMasterId: pServiceStatementFieldMasterId,
            ROW_START: Math.floor(Date.now()),
          },
        })

        const response = await fetch(clientSideTblOfPatientServiceStatements.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // "Authorization": "Bearer " + TOKEN
          },
          body: JSON.stringify({
            data: {
              serverSideRowUuid:
                clientSideTblOfPatientServiceStatementsRow.tblServiceStatementsOfPatient[0].serverSideRowUuid,
              patientUuid: 'bfe041fa-073b-4223-8c69-0540ee678ff8',
              serviceStatementFieldMasterId: pServiceStatementFieldMasterId,
              recordChangedByUuid: 'bua674fa-073b-4223-8c69-0540ee786kj8',
            },
          }),
        })
        if (response.status !== 200) {
          clientSideTblOfPatientServiceStatements.update({
            where: clientSideTblOfPatientServiceStatementsRow.tblServiceStatementsOfPatient[0].clientSideUniqRowId,
            data: {
              ROW_END: Math.floor(Date.now()),
            },
          })
          this.$notify({
            title: 'Error',
            message: 'Not updated on server',
            type: 'Error',
            duration: 3000,
          })
        } else {
          this.$notify({
            title: 'Success',
            message: 'Updated on server',
            type: 'success',
            duration: 3000,
          })
        }
      }
    },

    mfApplyOneEntryRuleOnServiceStatementFieldCategory(
      pArOfObjectsFromClientMasterDB,
      pServiceStatementFieldCategoryToApplyRuleOn
    ) {
      let elementsOfThisSetAlreadyAssignedToPatient = clientSideTblOfPatientServiceStatements
        .query()
        .with('tblLinkToServiceStatementFieldMaster')
        .whereHas('tblLinkToServiceStatementFieldMaster', (query) => {
          query.where('serviceStatementFieldCategory', pServiceStatementFieldCategoryToApplyRuleOn)
        })
        .where('ROW_END', 2147483648000)
        .get()
      if (elementsOfThisSetAlreadyAssignedToPatient.length > 0) {
        for (let i = 0; i < pArOfObjectsFromClientMasterDB.length; i++) {
          if (
            pArOfObjectsFromClientMasterDB[i].serviceStatementFieldCategory ===
            pServiceStatementFieldCategoryToApplyRuleOn
          ) {
            // master list has 10 entries. Once the category has matched there are 2 possibilityes. P1: This element is there in SS  of patient P2: This element is not there in SS of patient
            if (
              // Handling Possibility 1:  This element is there in SS of patient
              pArOfObjectsFromClientMasterDB[i].tblLinkToServiceStatementForPatientFieldValues !== null &&
              pArOfObjectsFromClientMasterDB[i].tblLinkToServiceStatementForPatientFieldValues.ROW_END ==
                '2147483648000'
            ) {
            } else {
              // Handling Possibility 2: This element is not there in SS of patient
              pArOfObjectsFromClientMasterDB.splice(i, 1)
              i = i - 1
            }
          }
        }
      }
      return pArOfObjectsFromClientMasterDB
    },

    /**
     * Rule: If "Total minutes in psychotherapy" has been chosen to be N.
     * Then from "Total minutes with patient" remove elements that are less than N
     */
    mfApplyTotalMinutesInPsychotherapyRuleOnServiceStatementFieldCategory(pArOfObjectsFromClientMasterDB) {
      /**
       * Step 1: Getting 'Total minutes in psychotherapy' already assigned to patient
       */
      let elementsOfThisSetAlreadyAssignedToPatient = clientSideTblOfPatientServiceStatements
        .query()
        .with('tblLinkToServiceStatementFieldMaster')
        .whereHas('tblLinkToServiceStatementFieldMaster', (query) => {
          query.where('serviceStatementFieldCategory', 'Total minutes in psychotherapy')
        })
        .where('ROW_END', 2147483648000)
        .get()

      /**
       * Step 2: If 'Total minutes in psychotherapy' is assigned.
       * Than store relative service statement master category detail in a variable named 'categoryOfThisSetAssignedToPatient'
       */
      if (elementsOfThisSetAlreadyAssignedToPatient.length > 0) {
        const categoryOfThisSetAssignedToPatient =
          elementsOfThisSetAlreadyAssignedToPatient[0].tblLinkToServiceStatementFieldMaster

        /**
         * Step 3: Iterate service statement master category object to process
         */
        for (let i = 0; i < pArOfObjectsFromClientMasterDB.length; i++) {
          /**
           * Step 4: Check if category is 'Total minutes with patient'.
           * Otherwise do not need to do any manipulation
           */
          if (pArOfObjectsFromClientMasterDB[i].serviceStatementFieldCategory === 'Total minutes with patient') {
            /**
             * Step 5: If "Total minutes in psychotherapy" has been assigned to the patient to be N.
             * Than remove "Total minutes with patient" elements that are less than N.
             */
            if (
              parseInt(pArOfObjectsFromClientMasterDB[i].serviceStatementFieldDescription) <
              parseInt(categoryOfThisSetAssignedToPatient.serviceStatementFieldDescription)
            ) {
              pArOfObjectsFromClientMasterDB.splice(i, 1)
              i = i - 1
            }
          }
        }
      }
      return pArOfObjectsFromClientMasterDB
    },

    /**
     * Rule: If "Total minutes with patient" has been chosen to be N.
     * Then from "Total minutes in psychotherapy" remove elements that are greater than N
     */
    mfApplyTotalMinutesWithPatientRuleOnServiceStatementFieldCategory(pArOfObjectsFromClientMasterDB) {
      /**
       * Step 1: Getting 'Total minutes with patient' already assigned to patient
       */
      let elementsOfThisSetAlreadyAssignedToPatient = clientSideTblOfPatientServiceStatements
        .query()
        .with('tblLinkToServiceStatementFieldMaster')
        .whereHas('tblLinkToServiceStatementFieldMaster', (query) => {
          query.where('serviceStatementFieldCategory', 'Total minutes with patient')
        })
        .where('ROW_END', 2147483648000)
        .get()

      /**
       * Step 2: If 'Total minutes with patient' is assigned.
       * Than store relative service statement master category detail in a variable named 'categoryOfThisSetAssignedToPatient'
       */
      if (elementsOfThisSetAlreadyAssignedToPatient.length > 0) {
        const categoryOfThisSetAssignedToPatient =
          elementsOfThisSetAlreadyAssignedToPatient[0].tblLinkToServiceStatementFieldMaster

        /**
         * Step 3: Iterate service statement master category object to process
         */
        for (let i = 0; i < pArOfObjectsFromClientMasterDB.length; i++) {
          /**
           * Step 4: Check if category is 'Total minutes in psychotherapy'.
           * Otherwise do not need to do any manipulation
           */
          if (pArOfObjectsFromClientMasterDB[i].serviceStatementFieldCategory === 'Total minutes in psychotherapy') {
            /**
             * Step 5: If "Total minutes with patient" has been assigned to the patient to be N.
             * Than remove "Total minutes in psychotherapy" elements that are greater than N.
             */
            if (
              parseInt(pArOfObjectsFromClientMasterDB[i].serviceStatementFieldDescription) >
              parseInt(categoryOfThisSetAssignedToPatient.serviceStatementFieldDescription)
            ) {
              pArOfObjectsFromClientMasterDB.splice(i, 1)
              i = i - 1
            }
          }
        }
      }
      return pArOfObjectsFromClientMasterDB
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
