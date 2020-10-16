<template>
  <div>
    <el-input placeholder="Filter text" v-model="userTypedKeyword" />
    <div
      v-for="(allPastPsychHistorysInsideAGroup,
      groupNameGivenAsIndex) in cfGetMasterRowsOfPastPsychHistorysGrouped"
      :key="allPastPsychHistorysInsideAGroup.id"
    >
      {{ groupNameGivenAsIndex }}
      <div class="sc-service-statement-all-content-body">
        <div v-for="ss in allPastPsychHistorysInsideAGroup" :key="ss.pastPsychHistoryMasterId">
          <div v-if="mfCheckIfThisExistsInChildTable(ss)">
            <el-button
              @click="mfTogglePastPsychHistory(ss.pastPsychHistoryMasterId)"
              type="primary"
              >{{ ss.pastPsychHistoryDescription }}</el-button
            >
          </div>
          <div v-else>
            <el-button @click="mfTogglePastPsychHistory(ss.pastPsychHistoryMasterId)">{{
              ss.pastPsychHistoryDescription
            }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientSideTblOfMasterPastPsychHistorys from '../db/client-side/structure/master-table-of-service-statements.js'
import clientSideTblOfPatientPastPsychHistorys from '../db/client-side/structure/patient-table-of-service-statements.js'

export default {
  data() {
    return {
      userTypedKeyword: '',
    }
  },
  computed: {
    cfGetMasterRowsOfPastPsychHistorysGrouped() {
      console.log('cf called')
      let arOfObjectsFromClientSideMasterDB = clientSideTblOfMasterPastPsychHistorys
        .query()
        .with('tblPastPsychHistorysForPatientLink')
        .where('ROW_END', 2147483648000)
        .where((_record, query) => {
          query
            .where('pastPsychHistoryCategory', (value) =>
              value.toLowerCase().includes(this.userTypedKeyword.toLowerCase())
            )
            .orWhere('pastPsychHistoryDescription', (value) =>
              value.toLowerCase().includes(this.userTypedKeyword.toLowerCase())
            )
        })
        .get()

      // Apply rules given by doctors

      // Rule1: If one Time in psychotherapy then do not show others
      arOfObjectsFromClientSideMasterDB = this.mfApplyOneEntryRuleOnPastPsychHistoryCategory(
        arOfObjectsFromClientSideMasterDB,
        'Total minutes in psychotherapy'
      )

      // Rule2: If one Time in psychotherapy then do not show others
      arOfObjectsFromClientSideMasterDB = this.mfApplyOneEntryRuleOnPastPsychHistoryCategory(
        arOfObjectsFromClientSideMasterDB,
        'Total minutes with patient'
      )

      // Rule 3: If "total time in psychotherapy" has been chosen to be N. Then "from total minutes with patient" remove elements that are less than N
      arOfObjectsFromClientSideMasterDB = this.mfApplyTotalMinutesInPsychotherapyRuleOnPastPsychHistoryCategory(
        arOfObjectsFromClientSideMasterDB
      )

      // Rule 4: If "total minutes with patient" has been chosen to be N. Then "from total time in psychotherapy" remove elements that are greater than N
      arOfObjectsFromClientSideMasterDB = this.mfApplyTotalMinutesWithPatientRuleOnPastPsychHistoryCategory(
        arOfObjectsFromClientSideMasterDB
      )

      // End: Now group the SS

      const ar = this.groupBy(arOfObjectsFromClientSideMasterDB, 'pastPsychHistoryCategory')

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
      if (pSS.tblPastPsychHistorysForPatientLink) {
        if (pSS.tblPastPsychHistorysForPatientLink.ROW_END === 2147483648000) {
          return true
        }
      }
      return false
    },
    mfTogglePastPsychHistory(pPastPsychHistoryMasterId) {
      // Goal1: Check if it already exists
      const exists = clientSideTblOfPatientPastPsychHistorys
        .query()
        .where('pastPsychHistoryMasterId', pPastPsychHistoryMasterId)
        .where('ROW_END', 2147483648000)
        .get()

      if (exists.length > 0) {
        clientSideTblOfPatientPastPsychHistorys.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            ROW_END: Math.floor(Date.now()),
          },
        })
      } else {
        clientSideTblOfPatientPastPsychHistorys.insert({
          data: {
            pastPsychHistoryMasterId: pPastPsychHistoryMasterId,
            ROW_START: Math.floor(Date.now()),
          },
        })
      }
    },

    mfApplyOneEntryRuleOnPastPsychHistoryCategory(
      pArOfObjectsFromClientSideMasterDB,
      pPastPsychHistoryCategoryToApplyRuleOn
    ) {
      let elementsOfThisSetAlreadyAssignedToPatient = clientSideTblOfPatientPastPsychHistorys
        .query()
        .with('tblPastPsychHistorysMasterLink')
        .whereHas('tblPastPsychHistorysMasterLink', (query) => {
          query.where('pastPsychHistoryCategory', pPastPsychHistoryCategoryToApplyRuleOn)
        })
        .where('ROW_END', 2147483648000)
        .get()
      if (elementsOfThisSetAlreadyAssignedToPatient.length > 0) {
        for (let i = 0; i < pArOfObjectsFromClientSideMasterDB.length; i++) {
          if (
            pArOfObjectsFromClientSideMasterDB[i].pastPsychHistoryCategory ===
            pPastPsychHistoryCategoryToApplyRuleOn
          ) {
            // master list has 10 entries. Once the category has matched there are 2 possibilityes. P1: This element is there in SS  of patient P2: This element is not there in SS of patient
            if (
              // Handling Possibility 1:  This element is there in SS of patient
              pArOfObjectsFromClientSideMasterDB[i].tblPastPsychHistorysForPatientLink !== null &&
              pArOfObjectsFromClientSideMasterDB[i].tblPastPsychHistorysForPatientLink.ROW_END ==
                '2147483648000'
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

    /**
     * Rule: If "Total minutes in psychotherapy" has been chosen to be N.
     * Then from "Total minutes with patient" remove elements that are less than N
     */
    mfApplyTotalMinutesInPsychotherapyRuleOnPastPsychHistoryCategory(
      pArOfObjectsFromClientSideMasterDB
    ) {
      /**
       * Step 1: Getting 'Total minutes in psychotherapy' already assigned to patient
       */
      let elementsOfThisSetAlreadyAssignedToPatient = clientSideTblOfPatientPastPsychHistorys
        .query()
        .with('tblPastPsychHistorysMasterLink')
        .whereHas('tblPastPsychHistorysMasterLink', (query) => {
          query.where('pastPsychHistoryCategory', 'Total minutes in psychotherapy')
        })
        .where('ROW_END', 2147483648000)
        .get()

      /**
       * Step 2: If 'Total minutes in psychotherapy' is assigned.
       * Than store relative past psych history master category detail in a variable named 'categoryOfThisSetAssignedToPatient'
       */
      if (elementsOfThisSetAlreadyAssignedToPatient.length > 0) {
        const categoryOfThisSetAssignedToPatient =
          elementsOfThisSetAlreadyAssignedToPatient[0].tblPastPsychHistorysMasterLink

        /**
         * Step 3: Iterate past psych history master category object to process
         */
        for (let i = 0; i < pArOfObjectsFromClientSideMasterDB.length; i++) {
          /**
           * Step 4: Check if category is 'Total minutes with patient'.
           * Otherwise do not need to do any manipulation
           */
          if (
            pArOfObjectsFromClientSideMasterDB[i].pastPsychHistoryCategory ===
            'Total minutes with patient'
          ) {
            /**
             * Step 5: If "Total minutes in psychotherapy" has been assigned to the patient to be N.
             * Than remove "Total minutes with patient" elements that are less than N.
             */
            if (
              parseInt(pArOfObjectsFromClientSideMasterDB[i].pastPsychHistoryDescription) <
              parseInt(categoryOfThisSetAssignedToPatient.pastPsychHistoryDescription)
            ) {
              pArOfObjectsFromClientSideMasterDB.splice(i, 1)
              i = i - 1
            }
          }
        }
      }
      return pArOfObjectsFromClientSideMasterDB
    },

    /**
     * Rule: If "Total minutes with patient" has been chosen to be N.
     * Then from "Total minutes in psychotherapy" remove elements that are greater than N
     */
    mfApplyTotalMinutesWithPatientRuleOnPastPsychHistoryCategory(
      pArOfObjectsFromClientSideMasterDB
    ) {
      /**
       * Step 1: Getting 'Total minutes with patient' already assigned to patient
       */
      let elementsOfThisSetAlreadyAssignedToPatient = clientSideTblOfPatientPastPsychHistorys
        .query()
        .with('tblPastPsychHistorysMasterLink')
        .whereHas('tblPastPsychHistorysMasterLink', (query) => {
          query.where('pastPsychHistoryCategory', 'Total minutes with patient')
        })
        .where('ROW_END', 2147483648000)
        .get()

      /**
       * Step 2: If 'Total minutes with patient' is assigned.
       * Than store relative past psych history master category detail in a variable named 'categoryOfThisSetAssignedToPatient'
       */
      if (elementsOfThisSetAlreadyAssignedToPatient.length > 0) {
        const categoryOfThisSetAssignedToPatient =
          elementsOfThisSetAlreadyAssignedToPatient[0].tblPastPsychHistorysMasterLink

        /**
         * Step 3: Iterate past psych history master category object to process
         */
        for (let i = 0; i < pArOfObjectsFromClientSideMasterDB.length; i++) {
          /**
           * Step 4: Check if category is 'Total minutes in psychotherapy'.
           * Otherwise do not need to do any manipulation
           */
          if (
            pArOfObjectsFromClientSideMasterDB[i].pastPsychHistoryCategory ===
            'Total minutes in psychotherapy'
          ) {
            /**
             * Step 5: If "Total minutes with patient" has been assigned to the patient to be N.
             * Than remove "Total minutes in psychotherapy" elements that are greater than N.
             */
            if (
              parseInt(pArOfObjectsFromClientSideMasterDB[i].pastPsychHistoryDescription) >
              parseInt(categoryOfThisSetAssignedToPatient.pastPsychHistoryDescription)
            ) {
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
