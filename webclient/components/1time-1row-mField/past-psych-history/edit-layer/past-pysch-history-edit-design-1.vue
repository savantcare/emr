<template>
  <div>
    <el-input placeholder="Filter text" v-model="userTypedSearchFilterKeyword" />
    <el-row :gutter="20">
      <el-col
        :span="8"
        v-for="(allPastPsychHistoryInsideAGroup, groupNameGivenAsIndex) in cfGetMasterRowsOfPastPsychHistoryGrouped"
        :key="allPastPsychHistoryInsideAGroup.id"
      >
        <div class="sc-past-psych-history-all-content-body">
          <div v-for="ss in allPastPsychHistoryInsideAGroup" :key="ss.fieldIdFromMaster">
            <el-card style="width: 400px">
              <div slot="header" class="clearfix">
                <span>{{ groupNameGivenAsIndex }}</span>
              </div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 14 }"
                v-model="liveTypeObjOfFields[ss.formFieldName]"
                :placeholder="ss.pastPsychHistoryDescription"
                style="width: 400px"
              ></el-input>
              <el-button
                type="success"
                icon="el-icon-check"
                size="mini"
                @click="mfSave(ss.formFieldName, liveTypeObjOfFields[ss.formFieldName])"
                circle
              ></el-button>

              <el-card style="width: 400px">
                <div class="show-diff" v-html="fieldDiffWithSecondayObj[ss.formFieldName]"></div>
              </el-card>
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

export default {
  data() {
    return {
      vOrmSaveScheduledForDebounce: [],
      userTypedSearchFilterKeyword: '',
      liveTypeObjOfFields: {},
      fieldDiffWithSecondayObj: {},
      secondaryObjOfFieldsForComparison: [],
    }
  },
  mounted() {
    let arOfObjectsFromClientSideDB = []

    arOfObjectsFromClientSideDB = clientSideTblOfPatientPastPsychHistory
      .query()
      .with('tblPastPsychHistoryMasterLink')
      .where('ROW_END', 2147483648000) // This gives current data
      .get()

    if (arOfObjectsFromClientSideDB.length === 0) return

    for (let i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
      const fieldName = arOfObjectsFromClientSideDB[i].tblPastPsychHistoryMasterLink[
        'pastPsychHistoryDescription'
      ].replace(/ /g, '_')

      const fieldValue = arOfObjectsFromClientSideDB[i]['fieldValue']

      this.$set(this.liveTypeObjOfFields, fieldName, fieldValue)
    }

    // Comparison happens with data that is already in MariaDB
    arOfObjectsFromClientSideDB = clientSideTblOfPatientPastPsychHistory
      .query()
      .with('tblPastPsychHistoryMasterLink')
      .where('vnRowStateInSession', 1) // This gives data already saved to DB
      .get()

    if (arOfObjectsFromClientSideDB.length === 0) return

    for (let i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
      const fieldName = arOfObjectsFromClientSideDB[i].tblPastPsychHistoryMasterLink[
        'pastPsychHistoryDescription'
      ].replace(/ /g, '_')

      const fieldValue = arOfObjectsFromClientSideDB[i]['fieldValue']

      this.$set(this.secondaryObjOfFieldsForComparison, fieldName, fieldValue)
    }
  },

  watch: {
    'liveTypeObjOfFields.Past_outpatient_treatment': {
      handler: function (newValue, oldValue) {
        this.debounceThenSaveToOrm('Past_outpatient_treatment', newValue, 1)
        this.doDiff('Past_outpatient_treatment', newValue) // keeping this outside debounce to give immediate feedback
      },
    },
    'liveTypeObjOfFields.Past_meds_trials': {
      handler: function (newValue, oldValue) {
        this.debounceThenSaveToOrm('Past_meds_trials', newValue, 2)
        this.doDiff('Past_meds_trials', newValue) // keeping this outside debounce to give immediate feedback
      },
    },
    'liveTypeObjOfFields.Hospitalization': {
      handler: function (newValue, oldValue) {
        this.debounceThenSaveToOrm('Hospitalization', newValue, 3)
        this.doDiff('Hospitalization', newValue) // keeping this outside debounce to give immediate feedback
      },
    },
    'liveTypeObjOfFields.History_of_violence': {
      handler: function (newValue, oldValue) {
        this.debounceThenSaveToOrm('History_of_violence', newValue, 4)
        this.doDiff('History_of_violence', newValue) // keeping this outside debounce to give immediate feedback
      },
    },
    'liveTypeObjOfFields.History_of_self_harm': {
      handler: function (newValue, oldValue) {
        this.debounceThenSaveToOrm('History_of_self_harm', newValue, 5)
        this.doDiff('History_of_self_harm', newValue) // keeping this outside debounce to give immediate feedback
      },
    },
    'liveTypeObjOfFields.Past_substance_abuse': {
      handler: function (newValue, oldValue) {
        this.debounceThenSaveToOrm('Past_substance_abuse', newValue, 6)
        this.doDiff('Past_substance_abuse', newValue) // keeping this outside debounce to give immediate feedback
      },
    },
  },
  computed: {
    cfGetMasterRowsOfPastPsychHistoryGrouped() {
      let arOfObjectsFromClientSideMasterDB = clientSideTblOfMasterPastPsychHistory
        .query()
        .with('tblPastPsychHistoryForPatientLink')
        .where('ROW_END', 2147483648000)
        .where((_record, query) => {
          query
            .where('pastPsychHistoryCategory', (value) =>
              value.toLowerCase().includes(this.userTypedSearchFilterKeyword.toLowerCase())
            )
            .orWhere('pastPsychHistoryDescription', (value) =>
              value.toLowerCase().includes(this.userTypedSearchFilterKeyword.toLowerCase())
            )
        })
        .get()

      for (let i = 0; i < arOfObjectsFromClientSideMasterDB.length; i++) {
        arOfObjectsFromClientSideMasterDB[i]['formFieldName'] = arOfObjectsFromClientSideMasterDB[i][
          'pastPsychHistoryDescription'
        ].replace(/ /g, '_')
      }

      const liveTypeObjOfFields = this.groupBy(arOfObjectsFromClientSideMasterDB, 'pastPsychHistoryCategory')
      return liveTypeObjOfFields
    },
  },
  methods: {
    mfSave(pFieldName, pCurrentValue) {
      let fieldIdFromMaster = 0
      if (pFieldName === 'Past_outpatient_treatment') fieldIdFromMaster = 1
      if (pFieldName === 'Past_meds_trials') fieldIdFromMaster = 2
      if (pFieldName === 'Hospitalization') fieldIdFromMaster = 3
      if (pFieldName === 'History_of_violence') fieldIdFromMaster = 4
      if (pFieldName === 'History_of_self_harm') fieldIdFromMaster = 5
      if (pFieldName === 'Past_substance_abuse') fieldIdFromMaster = 6

      const currentDataAr = clientSideTblOfPatientPastPsychHistory
        .query()
        .where('fieldIdFromMaster', fieldIdFromMaster) // fieldIdFromMaster cannot be primary key since there may be multiple due to historical data
        .where('vnRowStateInSession', (value) => /^3.*$/.test(value)) // I only write to copied row and not to original data
        // This will match all numbers that start with 3. The number 3 means it is copied row.
        .get()

      status = clientSideTblOfPatientPastPsychHistory.update({
        data: [
          {
            clientSideUniqRowId: currentDataAr[0]['clientSideUniqRowId'],
            vnRowStateInSession: 1,
            ROW_END: Math.floor(Date.now()),
          },
        ],
      })

      // when update query is run on mariaDB this also creates a new row
      status = clientSideTblOfPatientPastPsychHistory.insert({
        data: [{ fieldIdFromMaster: fieldIdFromMaster, fieldValue: pCurrentValue, vnRowStateInSession: 3 }],
      })
    },
    // Logic call 1st time set timer to execute. If call 2nd time very fast then clear the timer. If call slow then let timer execute
    debounceThenSaveToOrm(pFieldName, newValue, pFieldIdFromMaster) {
      /* 
        Task 1: Do debounce 
      */
      if (this.vOrmSaveScheduledForDebounce[pFieldIdFromMaster]) {
        clearTimeout(this.vOrmSaveScheduledForDebounce[pFieldIdFromMaster]) // this cancels the previously scheduled timeout
        this.vOrmSaveScheduledForDebounce[pFieldIdFromMaster] = false
      }
      this.vOrmSaveScheduledForDebounce[pFieldIdFromMaster] = setTimeout(
        function (scope) {
          /* 
            Task 2: Save to ORM
          */
          const currentDataAr = clientSideTblOfPatientPastPsychHistory
            .query()
            .where('fieldIdFromMaster', pFieldIdFromMaster) // fieldIdFromMaster cannot be primary key since there may be multiple due to historical data
            .where('vnRowStateInSession', (value) => /^3.*$/.test(value)) // I only write to copied row and not to original data
            // This will match all numbers that start with 3. The number 3 means it is copied row.
            .get()

          let status = null
          // clientSideRowUniqId will not have a value if this is being inserted first time
          if (currentDataAr.length > 0) {
            status = clientSideTblOfPatientPastPsychHistory.update({
              data: [
                {
                  clientSideUniqRowId: currentDataAr[0]['clientSideUniqRowId'],
                  fieldIdFromMaster: pFieldIdFromMaster, // For this 1 fieldId there might be 100 clientSideUniqRowId. Due to historical data
                  fieldValue: newValue,
                  vnRowStateInSession: 34,
                },
              ],
            })
          } else {
            // first time this data has been entered by the user
            status = clientSideTblOfPatientPastPsychHistory.insert({
              data: [{ fieldIdFromMaster: pFieldIdFromMaster, fieldValue: newValue, vnRowStateInSession: 3 }],
            })
          }
        },
        500, // setting timeout of 500 ms
        this
      )
    },
    doDiff(pFieldName, newValue) {
      if (this.secondaryObjOfFieldsForComparison[pFieldName]) {
        const diff = Diff.diffWords(this.secondaryObjOfFieldsForComparison[pFieldName], newValue)
        this.fieldDiffWithSecondayObj[pFieldName] = ''
        diff.forEach((part) => {
          // green for additions, red for deletions
          // grey for common parts
          const color = part.added ? 'green' : part.removed ? 'red' : 'grey'
          this.fieldDiffWithSecondayObj[pFieldName] =
            this.fieldDiffWithSecondayObj[pFieldName] + '<span style="color:' + color + '">'
          this.fieldDiffWithSecondayObj[pFieldName] = this.fieldDiffWithSecondayObj[pFieldName] + part.value
          this.fieldDiffWithSecondayObj[pFieldName] = this.fieldDiffWithSecondayObj[pFieldName] + '</span>'
        })
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
      //     console.log(this.liveTypeObjOfFields)
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
