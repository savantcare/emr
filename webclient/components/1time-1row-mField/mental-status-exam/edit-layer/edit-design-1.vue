<template>
  <div class="sc-mental-status-exam-all-content">
    <el-input placeholder="Filter text" v-model="userTypedKeyword" />
    <el-card
      shadow="hover"
      v-for="(allMentalStatusExamInsideAGroup, groupNameGivenAsIndex) in cfGetMasterRowsOfMentalStatusExamGrouped"
      :key="allMentalStatusExamInsideAGroup.id"
    >
      <div slot="header" class="clearfix">
        <span>{{ groupNameGivenAsIndex }}</span>
      </div>

      <div class="sc-mental-status-exam-all-content-body">
        <div v-for="ms in allMentalStatusExamInsideAGroup" :key="ms.mentalStatusExamMasterId">
          <div v-if="mfCheckIfThisExistsInChildTable(ms)">
            <div v-if="ms.mentalStatusExamFieldType === 'bool'">
              <el-button size="mini" @click="mfToggleMentalStatusExam(ms.mentalStatusExamMasterId)" type="primary">{{
                ms.mentalStatusExamDescription
              }}</el-button>
            </div>
            <div v-else>
              <el-input
                :placeholder="ms.mentalStatusExamDescription"
                v-model="descriptionModal[ms.mentalStatusExamMasterId]"
              ></el-input>

              <el-button
                v-if="mfHasDataChanged(ms.mentalStatusExamMasterId)"
                type="success"
                icon="el-icon-check"
                size="mini"
                @click="mfSave(ms.mentalStatusExamMasterId, descriptionModal[ms.mentalStatusExamMasterId])"
                circle
              ></el-button>
            </div>
          </div>
          <div v-else>
            <div v-if="ms.mentalStatusExamFieldType === 'bool'">
              <el-button size="mini" @click="mfToggleMentalStatusExam(ms.mentalStatusExamMasterId)">
                {{ ms.mentalStatusExamDescription }}
              </el-button>
            </div>
            <div v-else>
              <el-input
                size="mini"
                :placeholder="ms.mentalStatusExamDescription"
                v-model="descriptionModal[ms.mentalStatusExamMasterId]"
              ></el-input>
              <el-button
                v-if="mfHasDataChanged(ms.mentalStatusExamMasterId)"
                type="success"
                icon="el-icon-check"
                size="mini"
                @click="mfSave(ms.mentalStatusExamMasterId, descriptionModal[ms.mentalStatusExamMasterId])"
                circle
              ></el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import clientSideTblOfMasterMentalStatusExam from '../db/client-side/structure/master-table-of-mental-status-exam.js'
import clientSideTblOfPatientMentalStatusExam from '../db/client-side/structure/patient-table-of-mental-status-exam.js'

export default {
  data() {
    return {
      userTypedKeyword: '',
      descriptionModal: {},
      vOrmSaveScheduledForDebounce: [],
      liveTypedSearchFilterKeyword: '',
      liveTypedValueOfFields: {},
      dFieldDiffWithStakeObj: {},
      stakeObjOfFieldsForComparison: [],
    }
  },
  mounted() {
    let arOfObjectsFromClientSideDB = []

    // Goal: This Ct can be mounted and then removed and then mounted again. I need to load the latest data from clientSideDB
    arOfObjectsFromClientSideDB = clientSideTblOfPatientMentalStatusExam
      .query()
      .with('tblMentalStatusExamMasterLink')
      .where('ROW_END', 2147483648000) // This gives current data
      .get()

    console.log('arOfObjectsFromClientSideDB')
    console.log(arOfObjectsFromClientSideDB)
    if (arOfObjectsFromClientSideDB.length === 0) return

    // Goal: In the field show user the latest data
    for (let i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
      if (arOfObjectsFromClientSideDB[i].tblMentalStatusExamMasterLink.mentalStatusExamFieldType === 'input') {
        const fieldName = arOfObjectsFromClientSideDB[i].mentalStatusExamMasterId
        const fieldValue = arOfObjectsFromClientSideDB[i].description
        this.$set(this.descriptionModal, fieldName, fieldValue)
        console.log(this.descriptionModal)
      }
    }

    //this.mfGetStakeObjectForComparison()
  },

  watch: {
    'descriptionModal.11': {
      // 'Past_outpatient_treatment'
      handler: function (newValue, oldValue) {
        this.debounceThenSaveToOrm(newValue, 11)
      },
    },
    'descriptionModal.19': {
      // 'Past_meds_trials'
      handler: function (newValue, oldValue) {
        this.debounceThenSaveToOrm(newValue, 19)
      },
    },
  },
  computed: {
    cfGetMasterRowsOfMentalStatusExamGrouped() {
      const arOfObjectsFromClientSideMasterDB = clientSideTblOfMasterMentalStatusExam
        .query()
        .with('tblMentalStatusExamForPatientLink')
        .where('ROW_END', 2147483648000)
        .where((_record, query) => {
          query
            .where('mentalStatusExamCategory', (value) =>
              value.toLowerCase().includes(this.userTypedKeyword.toLowerCase())
            )
            .orWhere('mentalStatusExamDescription', (value) =>
              value.toLowerCase().includes(this.userTypedKeyword.toLowerCase())
            )
        })
        .get()

      const ar = this.groupBy(arOfObjectsFromClientSideMasterDB, 'mentalStatusExamCategory')

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

    mfHasDataChanged(mentalStatusExamMasterId) {
      const currentDataAr = clientSideTblOfPatientMentalStatusExam
        .query()
        .where('mentalStatusExamMasterId', mentalStatusExamMasterId) // mentalStatusExamMasterId cannot be primary key since there may be multiple due to historical data
        .where('vnRowStateInSession', (value) => /^34.*$/.test(value)) // I only write to copied row and not to original data
        // This will match all numbers that start with 3. The number 3 means it is copied row.
        .get()

      if (currentDataAr.length > 0) return true
    },

    debounceThenSaveToOrm(newValue, pFieldIdFromMaster) {
      console.log(newValue, pFieldIdFromMaster)

      /*
        Task 1: Do debounce
      */
      // Logic? When call 1st time setTimeoput to execute. If call 2nd time very fast then clear clearTimeout . If call slow then let timer execute

      if (this.vOrmSaveScheduledForDebounce[pFieldIdFromMaster]) {
        clearTimeout(this.vOrmSaveScheduledForDebounce[pFieldIdFromMaster]) // this cancels the previously scheduled timeout
        this.vOrmSaveScheduledForDebounce[pFieldIdFromMaster] = false
      }
      this.vOrmSaveScheduledForDebounce[pFieldIdFromMaster] = setTimeout(
        function (scope) {
          /*
            Task 2: Save to ORM
          */
          const currentDataAr = clientSideTblOfPatientMentalStatusExam
            .query()
            .where('mentalStatusExamMasterId', pFieldIdFromMaster) // mentalStatusExamMasterId cannot be primary key since there may be multiple due to historical data
            .where('vnRowStateInSession', (value) => /^3.*$/.test(value)) // I only write to copied row and not to original data
            // This will match all numbers that start with 3. The number 3 means it is copied row.
            .get()

          let status = null
          // clientSideRowUniqId will not have a value if this is being inserted first time
          if (currentDataAr.length > 0) {
            status = clientSideTblOfPatientMentalStatusExam.update({
              data: [
                {
                  clientSideUniqRowId: currentDataAr[0]['clientSideUniqRowId'],
                  mentalStatusExamMasterId: pFieldIdFromMaster, // For this 1 fieldId there might be 100 clientSideUniqRowId. Due to historical data
                  description: newValue,
                  vnRowStateInSession: 34,
                },
              ],
            })
          } else {
            // first time this data has been entered by the user. I set this as 34 to distinguish this from the case where the data has just been copied after a new row was inserted.
            status = clientSideTblOfPatientMentalStatusExam.insert({
              data: [{ mentalStatusExamMasterId: pFieldIdFromMaster, description: newValue, vnRowStateInSession: 34 }],
            })
          }
        },
        500, // setting timeout of 500 ms
        this
      )
    },

    async mfSave(fieldIdFromMaster, pCurrentValue) {
      const currentDataAr = clientSideTblOfPatientMentalStatusExam
        .query()
        .where('mentalStatusExamMasterId', fieldIdFromMaster) // fieldIdFromMaster cannot be primary key since there may be multiple due to historical data
        .where('vnRowStateInSession', (value) => /^3.*$/.test(value)) // I only write to copied row and not to original data
        // This will match all numbers that start with 3. The number 3 means it is copied row.
        .get()

      // Goal: get user ip

      await fetch('https://api.ipify.org?format=json')
        .then((x) => x.json())
        .then(({ ip }) => {
          this.userIp = ip
        })
      const response = await fetch(clientSideTblOfPatientMentalStatusExam.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          // "Authorization": "Bearer " + TOKEN
        },
        body: JSON.stringify({
          serverSideRowUuid: currentDataAr[0]['serverSideRowUuid'],
          mentalStatusExamFieldIdFromMentalStatusExamMaster: fieldIdFromMaster,
          description: pCurrentValue,
          patientUuid: 'bfe041fa-073b-4223-8c69-0540ee678ff8',
          recordChangedByUuid: 'bfe041fa-073b-4223-8c69-0540ee678ff8',
          recordChangedFromIPAddress: this.userIp, // set user ip
        }),
      })

      if (!response.ok) {
        // this block execute when response return fail status

        this.$notify({
          title: 'Error',
          message: 'Not updated on server',
          type: 'Error',
          duration: 3000,
        })
      } else {
        // this block execute when response return success status
        status = clientSideTblOfPatientMentalStatusExam.update({
          data: [
            {
              clientSideUniqRowId: currentDataAr[0]['clientSideUniqRowId'],
              vnRowStateInSession: 1,
              ROW_END: Math.floor(Date.now()),
            },
          ],
        })
        // when update query is run on mariaDB, the temporal system of MariDB also creates a new row
        status = clientSideTblOfPatientMentalStatusExam.insert({
          data: [{ mentalStatusExamMasterId: fieldIdFromMaster, description: pCurrentValue, vnRowStateInSession: 3 }], // Setting this as 3 means there will be no submit button. A state of copy and copy+change are different.
        })
        this.$notify({
          title: 'Success',
          message: 'Updated on server',
          type: 'success',
          duration: 3000,
        })
      }

      // Send the query to lumen

      //this.mfGetStakeObjectForComparison()
    },

    mfCheckIfThisExistsInChildTable(pMSE) {
      // I am able to get the data from child table.
      if (pMSE.tblMentalStatusExamForPatientLink) {
        if (pMSE.tblMentalStatusExamForPatientLink.ROW_END === 2147483648000) {
          return true
        }
      }
      return false
    },
    async mfToggleMentalStatusExam(pMentalStatusExamMasterId) {
      const exists = clientSideTblOfPatientMentalStatusExam
        .query()
        .where('mentalStatusExamMasterId', pMentalStatusExamMasterId)
        .where('ROW_END', 2147483648000)
        .get()

      /* Goal:
      1. If data already added then remove the data
      2. If data not added then insert the data */

      if (exists.length > 0) {
        clientSideTblOfPatientMentalStatusExam.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            ROW_END: Math.floor(Date.now()),
          },
        })

        // execute delete api to remove the data

        const response = await fetch(
          clientSideTblOfPatientMentalStatusExam.apiUrl + '/' + exists[0].serverSideRowUuid,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              // "Authorization": "Bearer " + TOKEN
            },
          }
        )

        if (!response.ok) {
          // this block execute when response return fail status
          clientSideTblOfPatientMentalStatusExam.update({
            where: exists[0].clientSideUniqRowId,
            data: {
              ROW_END: 2147483648000,
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
      } else {
        // this block execute when response return success status
        clientSideTblOfPatientMentalStatusExam.insert({
          data: {
            mentalStatusExamMasterId: pMentalStatusExamMasterId,
            ROW_START: Math.floor(Date.now()),
          },
        })

        // Goal: get user ip

        await fetch('https://api.ipify.org?format=json')
          .then((x) => x.json())
          .then(({ ip }) => {
            this.userIp = ip
          })

        const lastInsertedMSEData = clientSideTblOfPatientMentalStatusExam
          .query()
          .where('mentalStatusExamMasterId', pMentalStatusExamMasterId)
          .where('ROW_END', 2147483648000)
          .orderBy('ROW_START', 'desc')
          .first()

        // execute post api to add the data

        const response = await fetch(clientSideTblOfPatientMentalStatusExam.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // "Authorization": "Bearer " + TOKEN
          },
          body: JSON.stringify({
            serverSideRowUuid: lastInsertedMSEData.serverSideRowUuid,
            mentalStatusExamFieldIdFromMentalStatusExamMaster: pMentalStatusExamMasterId,
            patientUuid: 'bfe041fa-073b-4223-8c69-0540ee678ff8',
            recordChangedByUuid: 'bfe041fa-073b-4223-8c69-0540ee678ff8',
            recordChangedFromIPAddress: this.userIp, // set user ip
          }),
        })

        if (!response.ok) {
          // this block execute when response return fail status
          clientSideTblOfPatientMentalStatusExam.update({
            data: {
              mentalStatusExamMasterId: pMentalStatusExamMasterId,
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
          // this block execute when response return success status
          this.$notify({
            title: 'Success',
            message: 'Updated on server',
            type: 'success',
            duration: 3000,
          })
        }
      }
    },
  },
}
</script>
<style>
/* Goal: When less space display 1 card in a row. When more space display 100 cards in a row. */
.sc-mental-status-exam-all-content-body {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* Some other grid-template-columns options are :
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fit, max(200px)); compared to minmax(200px, 1fr) there is more magin between cols and less content fits.
  */
  grid-gap: 8px;
  grid-auto-flow: row; /* This is default value */
  margin: 0px;
}

/* Goal: add space between two content card*/
.sc-mental-status-exam-all-content .el-card {
  margin: 5px 0px !important;
}

/* Goal: remove extra white space from sc-mental-status-exam-all-content header*/
.sc-mental-status-exam-all-content .el-card__header {
  padding: 10px !important;
}

/* Goal: remove extra white space from sc-mental-status-exam-all-content body*/
.sc-mental-status-exam-all-content .el-card__body {
  padding: 8px !important;
}
</style>
