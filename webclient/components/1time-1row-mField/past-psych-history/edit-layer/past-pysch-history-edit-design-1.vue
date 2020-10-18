<template>
  <div>
    <el-input placeholder="Filter text" v-model="userTypedKeyword" />
    <el-row>
      <el-col
        :span="8"
        v-for="(allPastPsychHistoryInsideAGroup, groupNameGivenAsIndex) in cfGetMasterRowsOfPastPsychHistoryGrouped"
        :key="allPastPsychHistoryInsideAGroup.id"
      >
        {{ groupNameGivenAsIndex }}
        <div class="sc-past-psych-history-all-content-body">
          <div v-for="ss in allPastPsychHistoryInsideAGroup" :key="ss.fieldIdFromMaster">
            <el-card style="width: 400px">
              <el-input
                type="textarea"
                v-model="ar[ss.formFieldName]"
                :placeholder="ss.pastPsychHistoryDescription"
                style="width: 400px"
              ></el-input>
              <div class="show-diff" v-html="textDifferenceBetweenTwo"></div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import clientSideTblOfMasterPastPsychHistory from '../db/client-side/structure/master-table-of-past-psych-history.js'
import clientSideTblOfPatientPastPsychHistory from '../db/client-side/structure/patient-table-of-past-psych-history.js'

require('colors')
const Diff = require('diff')

const one = 'Jai kali ma'

export default {
  data() {
    return {
      vOrmSaveScheduled: false,
      userTypedKeyword: '',
      reverse: true,
      ar: [],
      debouncedAr: [],
      textDifferenceBetweenTwo: '',
      activities: [
        {
          content: 'Event start',
          timestamp: '2018-04-15',
        },
        {
          content: 'Approved',
          timestamp: '2018-04-13',
        },
        {
          content: 'Success',
          timestamp: '2018-04-11',
        },
      ],
    }
  },
  mounted() {
    let arOfObjectsFromClientSideDB = []

    arOfObjectsFromClientSideDB = clientSideTblOfPatientPastPsychHistory
      .query()
      .with('tblPastPsychHistoryMasterLink')
      .where('ROW_END', 2147483648000)
      .get()

    this.$set(this.ar, 'Past_outpatient_treatment', arOfObjectsFromClientSideDB[0]['fieldValue'])

    console.log(arOfObjectsFromClientSideDB)
    console.log(this.ar)
  },
  watch: {
    'ar.Past_outpatient_treatment': {
      handler: function (newValue, oldValue) {
        //console.log(newValue)
        //console.log(this.debouncedAr)
        this.debouncer('Past_outpatient_treatment', newValue)
        const diff = Diff.diffWords(one, newValue)
        this.textDifferenceBetweenTwo = ''
        console.log(diff)
        diff.forEach((part) => {
          // green for additions, red for deletions
          // grey for common parts
          const color = part.added ? 'green' : part.removed ? 'red' : 'grey'
          this.textDifferenceBetweenTwo = this.textDifferenceBetweenTwo + '<span style="color:' + color + '">'
          this.textDifferenceBetweenTwo = this.textDifferenceBetweenTwo + part.value
          this.textDifferenceBetweenTwo = this.textDifferenceBetweenTwo + '</span>'
        })
      },
    },
    'debouncedAr.Past_outpatient_treatment': {
      handler: function (newValue, oldValue) {
        console.log('watching debouncedAr', this.debouncedAr.Past_outpatient_treatment)

        // get the existing ID. For the same fieldMasterId there maybe 10 fieldValues for historical data
        const ar = clientSideTblOfPatientPastPsychHistory.query().where('fieldIdFromMaster', 1).get()
        let status = null
        // clientSideRowUniqId will not have a value if this is being inserted first time
        if (ar.length > 0) {
          status = clientSideTblOfPatientPastPsychHistory.update({
            data: [{ clientSideUniqRowId: ar[0]['clientSideUniqRowId'], fieldIdFromMaster: 1, fieldValue: newValue }],
          })
        } else {
          // first time this data has been entered by the user
          status = clientSideTblOfPatientPastPsychHistory.insert({
            data: [{ fieldIdFromMaster: 1, fieldValue: newValue }],
          })
        }
      },
    },
    'ar.Past_meds_trials': {
      handler: function (oldValue, newValue) {
        console.log('inside watch')
        console.log(oldValue)
        console.log(newValue)
      },
    },
    'ar.Hospitalization': {
      handler: function (oldValue, newValue) {
        console.log('inside watch')
        console.log(oldValue)
        console.log(newValue)
      },
    },
    'ar.History_of_violence': {
      handler: function (oldValue, newValue) {
        console.log('inside watch')
        console.log(oldValue)
        console.log(newValue)
      },
    },
    'ar.History_of_self': {
      handler: function (oldValue, newValue) {
        console.log('inside watch')
        console.log(oldValue)
        console.log(newValue)
      },
    },
    'ar.Past_substance_abuse': {
      handler: function (oldValue, newValue) {
        console.log('inside watch')
        console.log(oldValue)
        console.log(newValue)
      },
    },
  },
  computed: {
    cfGetMasterRowsOfPastPsychHistoryGrouped() {
      console.log('cf called')
      let arOfObjectsFromClientSideMasterDB = clientSideTblOfMasterPastPsychHistory
        .query()
        .with('tblPastPsychHistoryForPatientLink')
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

      for (let i = 0; i < arOfObjectsFromClientSideMasterDB.length; i++) {
        arOfObjectsFromClientSideMasterDB[i]['formFieldName'] = arOfObjectsFromClientSideMasterDB[i][
          'pastPsychHistoryDescription'
        ].replace(/ /g, '_')
      }

      const ar = this.groupBy(arOfObjectsFromClientSideMasterDB, 'pastPsychHistoryCategory')

      // console.log(ar)
      return ar
    },
  },
  methods: {
    debouncer(pFieldName, newValue) {
      if (this.vOrmSaveScheduled) {
        clearTimeout(this.vOrmSaveScheduled) // this cancels the previously scheduled timeout
        this.vOrmSaveScheduled = false
      }
      this.vOrmSaveScheduled = setTimeout(
        function (scope) {
          scope.$set(scope.debouncedAr, pFieldName, newValue) // needed to make it reactive
          console.log('array set', scope.debouncedAr)
        },
        500, // setting timeout of 500 ms
        this
      )
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
    mfCheckIfThisExistsInChildTable(pSS) {
      // I am able to get the data from child table.
      if (pSS.tblPastPsychHistoryForPatientLink) {
        if (pSS.tblPastPsychHistoryForPatientLink.ROW_END === 2147483648000) {
          return true
        }
      }
      return false
    },
    mfSavePastPsychHistoryInDB(pfieldIdFromMaster) {
      //      console.log(pfieldIdFromMaster)
      //     console.log(this.ar)
      /* Goal1: Check if it already exists
      const exists = clientSideTblOfPatientPastPsychHistory
        .query()
        .where('fieldIdFromMaster', pfieldIdFromMaster)
        .where('ROW_END', 2147483648000)
        .get()

      if (exists.length > 0) {
        clientSideTblOfPatientPastPsychHistory.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            ROW_END: Math.floor(Date.now()),
          },
        })
      } else {
        clientSideTblOfPatientPastPsychHistory.insert({
          data: {
            fieldIdFromMaster: pfieldIdFromMaster,
            ROW_START: Math.floor(Date.now()),
          },
        })
      } */
    },
  },
}
</script>

<style>
.sc-past-psych-history-all-content-body {
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
