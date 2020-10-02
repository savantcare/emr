<template>
  <div>
    <el-input placeholder="Filter text" v-model="userTypedKeyword" />
    <div
      v-for="(allPsychReviewOfSystemsInsideAGroup,
      groupNameGivenAsIndex) in cfGetMasterRowsOfPsychReviewOfSystemsGrouped"
      :key="allPsychReviewOfSystemsInsideAGroup.id"
    >
      {{ groupNameGivenAsIndex }}
      <div class="sc-psych-review-of-systems-all-content-divs">
        <div
          v-for="ros in allPsychReviewOfSystemsInsideAGroup"
          :key="ros.psychReviewOfSystemsMasterId"
        >
          <div v-if="mfCheckIfThisExistsInChildTable(ros)">
            <div v-if="ros.psychReviewOfSystemsFieldType === 'bool'">
              <el-button
                @click="mfTogglePsychReviewOfSystems(ros.psychReviewOfSystemsMasterId)"
                type="primary"
                >{{ ros.psychReviewOfSystemsDescription }}</el-button
              >
            </div>
            <div v-else>
              {{ ros.psychReviewOfSystemsDescription }}
              <el-slider
                v-model="value2"
                :min="0"
                :max="2"
                :step="1"
                :width="10"
                show-stops
                @change="mfChange($event, ros.psychReviewOfSystemsMasterId)"
              >
              </el-slider>
            </div>
          </div>
          <div v-else>
            <div v-if="ros.psychReviewOfSystemsFieldType === 'bool'">
              <el-button @click="mfTogglePsychReviewOfSystems(ros.psychReviewOfSystemsMasterId)">{{
                ros.psychReviewOfSystemsDescription
              }}</el-button>
            </div>
            <div v-else>
              {{ ros.psychReviewOfSystemsDescription }}
              <el-slider
                v-model="value2"
                :min="0"
                :max="2"
                :step="1"
                :width="10"
                show-stops
                @change="mfChange($event, ros.psychReviewOfSystemsMasterId)"
              >
              </el-slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientSideTblOfMasterPsychReviewOfSystems from '../db/client-side/structure/master-table-of-psych-review-of-systems.js'
import clientSideTblOfPatientPsychReviewOfSystems from '../db/client-side/structure/patient-table-of-psych-review-of-systems.js'

export default {
  data() {
    return {
      userTypedKeyword: '',
      descriptionModal: [],
      value2: 0,
    }
  },
  computed: {
    cfGetMasterRowsOfPsychReviewOfSystemsGrouped() {
      console.log('cf called')
      const arOfObjectsFromClientSideMasterDB = clientSideTblOfMasterPsychReviewOfSystems
        .query()
        .with('tblPsychReviewOfSystemsForPatientLink')
        .where('ROW_END', 2147483647.999999)
        .where((_record, query) => {
          query
            .where('psychReviewOfSystemsCategory', (value) =>
              value.toLowerCase().includes(this.userTypedKeyword.toLowerCase())
            )
            .orWhere('psychReviewOfSystemsDescription', (value) =>
              value.toLowerCase().includes(this.userTypedKeyword.toLowerCase())
            )
        })
        .get()

      // Apply rules given by doctors

      // End rules given by doctors

      // Now group the SS

      const ar = this.groupBy(arOfObjectsFromClientSideMasterDB, 'psychReviewOfSystemsCategory')

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
    mfCheckIfThisExistsInChildTable(pros) {
      // I am able to get the data from child table.
      if (pros.tblPsychReviewOfSystemsForPatientLink) {
        if (pros.tblPsychReviewOfSystemsForPatientLink.ROW_END === 2147483647.999999) {
          return true
        }
      }
      return false
    },
    mfChange(pValue, pPsychReviewOfSystemsMasterId) {
      console.log(pValue, pPsychReviewOfSystemsMasterId)
      const exists = clientSideTblOfPatientPsychReviewOfSystems
        .query()
        .where('psychReviewOfSystemsMasterId', pPsychReviewOfSystemsMasterId)
        .where('ROW_END', 2147483647.999999)
        .get()
      if (exists.length > 0) {
        clientSideTblOfPatientPsychReviewOfSystems.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            ROW_END: Math.floor(Date.now() / 1000),
          },
        })
      } else {
        clientSideTblOfPatientPsychReviewOfSystems.insert({
          data: {
            psychReviewOfSystemsMasterId: pPsychReviewOfSystemsMasterId,
          },
        })
      }
    },
  },
}
</script>

<style scoped>
.sc-psych-review-of-systems-all-content-divs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* Some other grid-template-columns options are :
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr)); 
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fit, max(200px)); compared to minmax(200px, 1fr) there is more magin between cols and less content fits.
  */
  grid-gap: 20px;
  grid-auto-flow: row; /* This is default value */
  margin: 20px;
}
</style>
