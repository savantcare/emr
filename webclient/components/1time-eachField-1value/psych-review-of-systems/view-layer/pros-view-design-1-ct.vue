<template>
  <showContentInCardComponent
    propMainCardName="Psych review of systems"
    :propActionsThatCanBeInvokedFromCardHeader="[
      {
        actionDescription: 'Multi edit',
        isDefaultAction: true,
      },
      {
        actionDescription: 'Toggle card display',
      },
      {
        actionDescription: 'Close card',
      },
    ]"
    :propClientRowLevelActions="[{}]"
  >
    <div slot="bodySlotContentFromParentToShowAboveChildCards">
      <el-card
        v-for="(allPsychReviewOfSystemsInsideAGroup, groupNameGivenAsIndex) in this.masterROSArray"
        :key="allPsychReviewOfSystemsInsideAGroup.id"
        class="box-card sc-individual-child-card"
        shadow="hover"
      >
        <div slot="header" class="clearfix">
          <span> {{ groupNameGivenAsIndex }}</span>
        </div>

        <!-- Ref https://forum.vuejs.org/t/how-to-pass-data-to-the-parameters-of-the-function/3060 -->
        {{ mfGetGroupToalForAGivenGroup({ groupNameGivenAsIndex }) }}

        <div class="sc-psych-review-of-systems-all-content-divs">
          <div v-for="ros in allPsychReviewOfSystemsInsideAGroup" :key="ros.psychReviewOfSystemsMasterId">
            <div v-if="ros.psychReviewOfSystemsFieldType === 'bool'">
              <el-button @click="mfTogglePsychReviewOfSystems(ros.psychReviewOfSystemsMasterId)">{{
                ros.psychReviewOfSystemsDescription
              }}</el-button>
            </div>
            <div v-else>
              <div v-if="cfPatientValuesUpdate[ros.psychReviewOfSystemsMasterId]">
                {{ ros.psychReviewOfSystemsDescription }}
                {{ cfPatientValuesUpdate[ros.psychReviewOfSystemsMasterId] }}
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </showContentInCardComponent>
</template>

<script>
import clientSideTblOfMasterPsychReviewOfSystems from '../db/client-side/structure/master-table-of-psych-review-of-systems.js'
import clientSideTblOfPatientPsychReviewOfSystems from '../db/client-side/structure/patient-table-of-psych-review-of-systems.js'
import showContentInCardComponent from '@/components/non-temporal/display-manager/show-content-in-card-component.vue'

export default {
  data() {
    return {
      userTypedKeyword: '',
      patientClientFieldValueModel: [],
      masterROSArray: [],
      groupTotal: [],
      depressionTotal: 10,
    }
  },

  components: { showContentInCardComponent },

  computed: {
    cfArOfPsychReviewOfSystemsForDisplay() {
      const arOfObjectsFromClientDB = clientSideTblOfPatientPsychReviewOfSystems
        .query()
        .with('tblPsychReviewOfSystemsMasterLink')
        .where('ROW_END', 2147483648000)
        .get()

      for (var i = 0; i < arOfObjectsFromClientDB.length; i++) {
        arOfObjectsFromClientDB[i]['cardContentOfTypeStringToShowInBodyOfCards'] =
          arOfObjectsFromClientDB[i].tblPsychReviewOfSystemsMasterLink.psychReviewOfSystemsCategory +
          ': ' +
          arOfObjectsFromClientDB[i].tblPsychReviewOfSystemsMasterLink.psychReviewOfSystemsDescription +
          ' - ' +
          arOfObjectsFromClientDB[i].psychReviewOfSystemsFieldValue
      }

      return arOfObjectsFromClientDB
    },
    cfPatientValuesUpdate() {
      console.log('fn called')
      let patientClientFieldValueModel = []
      // Goal2: Initialize field names with the previous field values patientClientFieldValueModel[masterId] = value
      const allPatientValues = clientSideTblOfPatientPsychReviewOfSystems.query().where('ROW_END', 2147483648000).get()

      for (let i = 0; i < allPatientValues.length; i++) {
        patientClientFieldValueModel[allPatientValues[i]['psychReviewOfSystemsMasterId']] = parseFloat(
          allPatientValues[i]['psychReviewOfSystemsFieldValue']
        )
      }
      return patientClientFieldValueModel
    },
  },
  methods: {
    mfIconDeleteClickedOnChildCard(pros) {
      clientSideTblOfPatientPsychReviewOfSystems.update({
        where: pros.clientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now()),
        },
      })

      // send event to the client
      const eventName = 'event-from-ct-pros-delete-row'
      this.$root.$emit(eventName, pros.tblPsychReviewOfSystemsMasterLink.psychReviewOfSystemsMasterId)
    },
    mxOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'edit psych review of systems',
      })
    },
    // This is used to make the rows that are in change state a orange background.
    mfGetCssClassNameForEachDataRow(pRow) {
      const strOfNumber = pRow.vnRowStateInSession.toString()
      const lastCharecter = strOfNumber.slice(-1)
      if (lastCharecter === '4' || lastCharecter === '6') {
        return 'color: #E6A23C;'
      } else {
        return 'color: #202020;'
      }
    },
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
    mfCalculateGroupTotalValue() {
      console.log('mfCalculateGroupTotalValue called')
      const arOfObjectsFromClientPatientDB = clientSideTblOfPatientPsychReviewOfSystems
        .query()
        .with('tblPsychReviewOfSystemsMasterLink')
        .where('ROW_END', 2147483648000)
        .get()

      //  console.log(arOfObjectsFromClientPatientDB)

      let groupTotal = []
      let catName = ''
      let value = 0
      for (let i = 0; i < arOfObjectsFromClientPatientDB.length; i++) {
        catName = arOfObjectsFromClientPatientDB[i]['tblPsychReviewOfSystemsMasterLink']['psychReviewOfSystemsCategory']
        if (!groupTotal[catName]) groupTotal[catName] = 0
        if (arOfObjectsFromClientPatientDB[i]['psychReviewOfSystemsFieldValue'] !== null) {
          value = arOfObjectsFromClientPatientDB[i]['psychReviewOfSystemsFieldValue']
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
  mounted() {
    let eventName = 'event-from-ct-pros-delete-row'
    this.$root.$on(eventName, (pRowId) => {
      this.patientClientFieldValueModel[pRowId] = 0
      this.mfSetValueInClientTbl(-1, pRowId) // -1 indicates not looked at.
      this.$forceUpdate() // without this the view layer only updates when I make some change
    })

    // Goal1: Get the master field names
    const arOfObjectsFromClientMasterDB = clientSideTblOfMasterPsychReviewOfSystems
      .query()
      .with('tblPsychReviewOfSystemsForPatientLink')
      .where('ROW_END', 2147483648000)
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

    const ar = this.groupBy(arOfObjectsFromClientMasterDB, 'psychReviewOfSystemsCategory')

    /*
    // Goal: fromn the array remove empty groups
    console.log(ar)

    let a = []
    let b = []
    for (a in ar) {
      console.log(a)
      for (let j = 0; j < ar[a].length; j++) {
        if (ar[a][j]['tblPsychReviewOfSystemsForPatientLink']) {
          if (ar[a][j]['tblPsychReviewOfSystemsForPatientLink']['psychReviewOfSystemsFieldValue']) {
            console.log(ar[a][j])
            continue
          }
        }
      }
      console.log('deleting', ar[a])
      array.delete(ar[a])
    }
  // End goal */

    this.masterROSArray = ar
  },
}
</script>
