<template>
  <div>
    <el-input placeholder="Filter text" v-model="liveTypedSearchFilterKeyword" />
    <el-row :gutter="20">
      <el-col :span="8" v-for="ss in cfGetMasterRowsOfPastPsychHistory" :key="ss.id">
        <el-card style="width: 400px">
          <div slot="header" class="clearfix">
            <span>{{ ss.pastPsychHistoryDescription }}</span>
          </div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 14 }"
            v-model="liveTypedValueOfFields[ss.fieldIdFromMaster]"
            :placeholder="ss.pastPsychHistoryDescription"
            style="width: 400px"
          ></el-input>
          <el-button
            v-if="mfHasDataChanged(ss.fieldIdFromMaster)"
            type="success"
            icon="el-icon-check"
            size="mini"
            @click="mfSave(ss.fieldIdFromMaster, liveTypedValueOfFields[ss.formFieldName])"
            circle
          ></el-button>

          <el-card style="width: 400px">
            <div class="show-diff" v-html="dFieldDiffWithStakeObj[ss.formFieldName]"></div>
          </el-card>
        </el-card>
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
      liveTypedSearchFilterKeyword: '',
      liveTypedValueOfFields: {},
      dFieldDiffWithStakeObj: {},
      stakeObjOfFieldsForComparison: [],
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

      this.$set(this.liveTypedValueOfFields, fieldName, fieldValue)
    }

    this.mfGetStakeObjectForComparison()
  },

  watch: {
    'liveTypedValueOfFields.1': {
      // 'Past_outpatient_treatment'
      handler: function (newValue, oldValue) {
        this.debounceThenSaveToOrm(newValue, 1)
        this.mfDoDiff('Past_outpatient_treatment', newValue) // keeping this outside debounce to give immediate feedback
      },
    },
    'liveTypedValueOfFields.2': {
      // 'Past_meds_trials'
      handler: function (newValue, oldValue) {
        this.debounceThenSaveToOrm(newValue, 2)
        this.mfDoDiff('Past_meds_trials', newValue) // keeping this outside debounce to give immediate feedback
      },
    },
    'liveTypedValueOfFields.3': {
      // 'Hospitalization'
      handler: function (newValue, oldValue) {
        this.debounceThenSaveToOrm(newValue, 3)
        this.mfDoDiff('Hospitalization', newValue) // keeping this outside debounce to give immediate feedback
      },
    },
    'liveTypedValueOfFields.4': {
      // 'History_of_violence'
      handler: function (newValue, oldValue) {
        this.debounceThenSaveToOrm(newValue, 4)
        this.mfDoDiff('History_of_violence', newValue) // keeping this outside debounce to give immediate feedback
      },
    },
    'liveTypedValueOfFields.5': {
      // 'History_of_self_harm'
      handler: function (newValue, oldValue) {
        this.debounceThenSaveToOrm(newValue, 5)
        this.mfDoDiff('History_of_self_harm', newValue) // keeping this outside debounce to give immediate feedback
      },
    },
    'liveTypedValueOfFields.6': {
      // 'Past_substance_abuse'
      handler: function (newValue, oldValue) {
        this.debounceThenSaveToOrm(newValue, 6)
        this.mfDoDiff('Past_substance_abuse', newValue) // keeping this outside debounce to give immediate feedback
      },
    },
  },
  computed: {
    cfGetMasterRowsOfPastPsychHistory() {
      let arOfObjectsFromClientSideMasterDB = clientSideTblOfMasterPastPsychHistory
        .query()
        .where((_record, query) => {
          query
            .where('pastPsychHistoryCategory', (value) =>
              value.toLowerCase().includes(this.liveTypedSearchFilterKeyword.toLowerCase())
            )
            .orWhere('pastPsychHistoryDescription', (value) =>
              value.toLowerCase().includes(this.liveTypedSearchFilterKeyword.toLowerCase())
            )
        })
        .get()

      for (let i = 0; i < arOfObjectsFromClientSideMasterDB.length; i++) {
        arOfObjectsFromClientSideMasterDB[i]['formFieldName'] = arOfObjectsFromClientSideMasterDB[i][
          'pastPsychHistoryDescription'
        ].replace(/ /g, '_')
      }

      return arOfObjectsFromClientSideMasterDB
    },
  },
  methods: {
    mfGetStakeObjectForComparison() {
      // Comparison happens with data that is already in MariaDB
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientPastPsychHistory
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

        this.$set(this.stakeObjOfFieldsForComparison, fieldName, fieldValue)
      }
    },

    mfHasDataChanged(fieldIdFromMaster) {
      const currentDataAr = clientSideTblOfPatientPastPsychHistory
        .query()
        .where('fieldIdFromMaster', fieldIdFromMaster) // fieldIdFromMaster cannot be primary key since there may be multiple due to historical data
        .where('vnRowStateInSession', (value) => /^34.*$/.test(value)) // I only write to copied row and not to original data
        // This will match all numbers that start with 3. The number 3 means it is copied row.
        .get()

      if (currentDataAr.length > 0) return true
    },
    mfSave(fieldIdFromMaster, pCurrentValue) {
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

      // when update query is run on mariaDB, the temporal system of MariDB also creates a new row
      status = clientSideTblOfPatientPastPsychHistory.insert({
        data: [{ fieldIdFromMaster: fieldIdFromMaster, fieldValue: pCurrentValue, vnRowStateInSession: 3 }], // Setting this as 3 means there will be no submit button. A state of copy and copy+change are different.
      })

      this.mfGetStakeObjectForComparison()
    },
    // Logic call 1st time set timer to execute. If call 2nd time very fast then clear the timer. If call slow then let timer execute
    debounceThenSaveToOrm(newValue, pFieldIdFromMaster) {
      console.log(newValue, pFieldIdFromMaster)

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
            // first time this data has been entered by the user. I set this as 34 to distinguish this from the case where the data has just been copied after a new row was inserted.
            status = clientSideTblOfPatientPastPsychHistory.insert({
              data: [{ fieldIdFromMaster: pFieldIdFromMaster, fieldValue: newValue, vnRowStateInSession: 34 }],
            })
          }
        },
        500, // setting timeout of 500 ms
        this
      )
    },
    mfDoDiff(pFieldName, newValue) {
      if (this.stakeObjOfFieldsForComparison[pFieldName]) {
        const diff = Diff.diffWords(this.stakeObjOfFieldsForComparison[pFieldName], newValue)
        this.dFieldDiffWithStakeObj[pFieldName] = ''
        diff.forEach((part) => {
          // green for additions, red for deletions
          // grey for common parts
          const color = part.added ? 'green' : part.removed ? 'red' : 'grey'
          this.dFieldDiffWithStakeObj[pFieldName] =
            this.dFieldDiffWithStakeObj[pFieldName] + '<span style="color:' + color + '">'
          this.dFieldDiffWithStakeObj[pFieldName] = this.dFieldDiffWithStakeObj[pFieldName] + part.value
          this.dFieldDiffWithStakeObj[pFieldName] = this.dFieldDiffWithStakeObj[pFieldName] + '</span>'
        })
      }
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
