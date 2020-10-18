<template>
  <div>
    <el-input placeholder="Filter text" v-model="userTypedKeyword" />
    <el-row>
      <el-col
        span="8"
        v-for="(allMedicalReviewOfSystemsInsideAGroup,
        groupNameGivenAsIndex) in cfGetMasterRowsOfMedicalReviewOfSystemsGrouped"
        :key="allMedicalReviewOfSystemsInsideAGroup.id"
      >
        {{ groupNameGivenAsIndex }}
        <div class="sc-medical-review-of-systems-all-content-body">
          <div v-for="ss in allMedicalReviewOfSystemsInsideAGroup" :key="ss.pastPsychHistoryMasterId">
            <div v-if="mfCheckIfThisExistsInChildTable(ss)">
              <el-input @click="mfSaveMedicalReviewOfSystemsInDB(ss.pastPsychHistoryMasterId)" type="textarea">{{
                ss.pastPsychHistoryDescription
              }}</el-input>
            </div>
            <div v-else>
              <el-input type="textarea" @click="mfSaveMedicalReviewOfSystemsInDB(ss.pastPsychHistoryMasterId)">{{
                ss.pastPsychHistoryDescription
              }}</el-input>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import clientSideTblOfMasterMedicalReviewOfSystems from '../db/client-side/structure/master-table-of-medical-review-of-systems.js'
import clientSideTblOfPatientMedicalReviewOfSystems from '../db/client-side/structure/patient-table-of-medical-review-of-systems.js'

export default {
  data() {
    return {
      userTypedKeyword: '',
    }
  },
  computed: {
    cfGetMasterRowsOfMedicalReviewOfSystemsGrouped() {
      console.log('cf called')
      let arOfObjectsFromClientSideMasterDB = clientSideTblOfMasterMedicalReviewOfSystems
        .query()
        .with('tblMedicalReviewOfSystemsForPatientLink')
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
      if (pSS.tblMedicalReviewOfSystemsForPatientLink) {
        if (pSS.tblMedicalReviewOfSystemsForPatientLink.ROW_END === 2147483648000) {
          return true
        }
      }
      return false
    },
    mfSaveMedicalReviewOfSystemsInDB(pMedicalReviewOfSystemsMasterId) {
      // Goal1: Check if it already exists
      const exists = clientSideTblOfPatientMedicalReviewOfSystems
        .query()
        .where('pastPsychHistoryMasterId', pMedicalReviewOfSystemsMasterId)
        .where('ROW_END', 2147483648000)
        .get()

      if (exists.length > 0) {
        clientSideTblOfPatientMedicalReviewOfSystems.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            ROW_END: Math.floor(Date.now()),
          },
        })
      } else {
        clientSideTblOfPatientMedicalReviewOfSystems.insert({
          data: {
            pastPsychHistoryMasterId: pMedicalReviewOfSystemsMasterId,
            ROW_START: Math.floor(Date.now()),
          },
        })
      }
    },
  },
}
</script>

<style>
.sc-medical-review-of-systems-all-content-body {
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
