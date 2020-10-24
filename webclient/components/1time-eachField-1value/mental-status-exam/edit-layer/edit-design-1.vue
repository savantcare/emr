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
      descriptionModal: [],
    }
  },
  computed: {
    cfGetMasterRowsOfMentalStatusExamGrouped() {
      const arOfObjectsFromClientMasterDB = clientSideTblOfMasterMentalStatusExam
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

      const ar = this.groupBy(arOfObjectsFromClientMasterDB, 'mentalStatusExamCategory')

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
