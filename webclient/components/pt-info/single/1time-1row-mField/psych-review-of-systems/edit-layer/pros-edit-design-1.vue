<template>
  <div>
    <el-input placeholder="Filter text" v-model="userTypedKeyword" />
    <div
      v-for="(allPsychReviewOfSystemsInsideAGroup, groupNameGivenAsIndex) in this.masterROSArray"
      :key="allPsychReviewOfSystemsInsideAGroup.id"
    >
      {{ groupNameGivenAsIndex }}
      <!-- Ref https://forum.vuejs.org/t/how-to-pass-data-to-the-parameters-of-the-function/3060 -->
      {{ mfGetGroupToalForAGivenGroup({ groupNameGivenAsIndex }) }}

      <div class="sc-psych-review-of-systems-all-content-divs">
        <div
          v-for="ros in allPsychReviewOfSystemsInsideAGroup"
          :key="ros.psychReviewOfSystemsMasterId"
        >
          <div v-if="ros.psychReviewOfSystemsFieldType === 'bool'">
            <el-button @click="mfTogglePsychReviewOfSystems(ros.psychReviewOfSystemsMasterId)">{{
              ros.psychReviewOfSystemsDescription
            }}</el-button>
          </div>
          <div v-else>
            {{ ros.psychReviewOfSystemsDescription }}
            <el-slider
              v-model="patientClientSideFieldValueModel[ros.psychReviewOfSystemsMasterId]"
              :min="0"
              :max="1"
              :step="0.5"
              :width="10"
              show-stops
              @change="mfSetValueInClientSideTable($event, ros.psychReviewOfSystemsMasterId)"
            >
            </el-slider>
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
      patientClientSideFieldValueModel: [],
      masterROSArray: [],
      groupTotal: [],
      depressionTotal: 10,
    }
  },
  mounted() {
    let eventName = 'event-from-ct-pros-delete-row'
    this.$root.$on(eventName, (pRowID) => {
      this.patientClientSideFieldValueModel[pRowID] = 0
      this.mfSetValueInClientSideTable(-1, pRowID) // -1 indicates not looked at.
      this.$forceUpdate() // without this the view layer only updates when I make some change
    })

    // Goal1: Get the master field names
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

    // Goal2: Initialize field names with the previous field values patientClientSideFieldValueModel[masterID] = value
    const allPatientValues = clientSideTblOfPatientPsychReviewOfSystems
      .query()
      .where('ROW_END', 2147483647.999999)
      .get()

    for (let i = 0; i < allPatientValues.length; i++) {
      this.patientClientSideFieldValueModel[
        allPatientValues[i]['psychReviewOfSystemsMasterId']
      ] = parseInt(allPatientValues[i]['psychReviewOfSystemsFieldValue'])
    }

    // Apply rules given by doctors

    // End rules given by doctors

    // Now group the SS

    const ar = this.groupBy(arOfObjectsFromClientSideMasterDB, 'psychReviewOfSystemsCategory')

    this.masterROSArray = ar
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
    mfSetValueInClientSideTable(pValue, pPsychReviewOfSystemsMasterId) {
      const exists = clientSideTblOfPatientPsychReviewOfSystems
        .query()
        .where('psychReviewOfSystemsMasterId', pPsychReviewOfSystemsMasterId)
        .where('ROW_END', 2147483647.999999)
        .get()

      // marking the old data as stale.
      if (exists.length > 0) {
        clientSideTblOfPatientPsychReviewOfSystems.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            ROW_END: Math.floor(Date.now() / 1000),
          },
        })
      }

      if (pValue === -1) {
        // -1 indicates not looked at. Hence I should not add a new row.
      } else {
        clientSideTblOfPatientPsychReviewOfSystems.insert({
          data: {
            psychReviewOfSystemsMasterId: pPsychReviewOfSystemsMasterId,
            psychReviewOfSystemsFieldValue: pValue,
          },
        })
      }
      this.mfCalculateGroupTotalValue()
    },
    mfCalculateGroupTotalValue() {
      console.log('mfCalculateGroupTotalValue called')
      const arOfObjectsFromClientSidePatientDB = clientSideTblOfPatientPsychReviewOfSystems
        .query()
        .with('tblPsychReviewOfSystemsMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()

      //  console.log(arOfObjectsFromClientSidePatientDB)

      let groupTotal = []
      let catName = ''
      let value = 0
      for (let i = 0; i < arOfObjectsFromClientSidePatientDB.length; i++) {
        catName =
          arOfObjectsFromClientSidePatientDB[i]['tblPsychReviewOfSystemsMasterLink'][
            'psychReviewOfSystemsCategory'
          ]
        if (!groupTotal[catName]) groupTotal[catName] = 0
        if (arOfObjectsFromClientSidePatientDB[i]['psychReviewOfSystemsFieldValue'] !== null) {
          value = arOfObjectsFromClientSidePatientDB[i]['psychReviewOfSystemsFieldValue']
          groupTotal[catName] = parseFloat(groupTotal[catName]) + parseFloat(value)
        }
      }

      this.groupTotal = groupTotal
    },

    mfGetGroupToalForAGivenGroup(pGroupName) {
      // console.log(this.groupTotal) // Unknown: When I load this Ct this fn gets called 130 times
      const groupName = pGroupName['groupNameGivenAsIndex']
      const value = this.groupTotal[groupName]
      // console.log('value is', value)
      return value
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
