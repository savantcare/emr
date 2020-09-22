<template>
  <div>
    <el-input placeholder="Filter text" v-model="userTypedKeyword" />
    <div
      v-for="(allPsychReviewOfSystemsInsideAGroup,
      groupNameGivenAsIndex) in cfGetMasterListOfPsychReviewOfSystemsGrouped"
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
              <el-input
                :placeholder="ros.psychReviewOfSystemsDescription"
                v-model="descriptionModal[ros.psychReviewOfSystemsMasterId]"
              ></el-input>
              <vue-slider
                v-model="descriptionModal[ros.psychReviewOfSystemsMasterId]"
                :marks="3"
                :min="0"
                :max="2"
                :absord="true"
                :included="true"
                :tooltip="'always'"
                :tooltip-formatter="(val) => ros.psychReviewOfSystemsDescription + ': ' + val"
              ></vue-slider>
            </div>
          </div>
          <div v-else>
            <div v-if="ros.psychReviewOfSystemsFieldType === 'bool'">
              <el-button @click="mfTogglePsychReviewOfSystems(ros.psychReviewOfSystemsMasterId)">{{
                ros.psychReviewOfSystemsDescription
              }}</el-button>
            </div>
            <div v-else>
              <vue-slider
                v-model="descriptionModal[ros.psychReviewOfSystemsMasterId]"
                :marks="false"
                :min="0"
                :max="2"
                :absord="true"
                :included="true"
                :tooltip="'always'"
                :tooltip-formatter="(val) => ros.psychReviewOfSystemsDescription + ': ' + val"
              ></vue-slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientSideTblMasterPsychReviewOfSystems from '../db/client-side/structure/table-master-list-of-psych-review-of-systems.js'
import clientSideTblPatientPsychReviewOfSystems from '../db/client-side/structure/table-psych-review-of-systems-of-a-patient.js'

export default {
  data() {
    return {
      userTypedKeyword: '',
      descriptionModal: [],
    }
  },
  computed: {
    cfGetMasterListOfPsychReviewOfSystemsGrouped() {
      console.log('cf called')
      const arOfObjectsFromClientSideMasterDB = clientSideTblMasterPsychReviewOfSystems
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

      // Rule1: If one "Modality of Psychotherapy" exists PatientPsychReviewOfSystems table then do not show others
      let modalityOfPsychotherapyExists = clientSideTblPatientPsychReviewOfSystems
        .query()
        .with('tblPsychReviewOfSystemsMasterLink')
        .whereHas('tblPsychReviewOfSystemsMasterLink', (query) => {
          query.where('psychReviewOfSystemsCategory', 'Modality of Psychotherapy')
        })
        .where('ROW_END', 2147483647.999999)
        .get()

      //  (query) => { query.where('psychReviewOfSystemsCategory', 'Modality of Psychotherapy') })

      console.log('modalityOfPsychotherapyExists', modalityOfPsychotherapyExists)

      if (modalityOfPsychotherapyExists.length > 0) {
        for (let i = 0; i < arOfObjectsFromClientSideMasterDB.length; i++) {
          if (
            arOfObjectsFromClientSideMasterDB[i].psychReviewOfSystemsCategory ===
            'Modality of Psychotherapy'
          ) {
            if (
              arOfObjectsFromClientSideMasterDB[i].tblPsychReviewOfSystemsForPatientLink !== null
            ) {
              console.log('row is there in client table.')
            } else {
              console.log(
                'delete the row category=Modality of psychotherapy from array of ros allowed to be chosen by patient'
              )
              arOfObjectsFromClientSideMasterDB.splice(i, 1)
              i = i - 1
            }
          }
        }
      }

      // Rule2: If one Time in psychotherapy then do not show others
      let timeInPsychotherapyExists = clientSideTblPatientPsychReviewOfSystems
        .query()
        .with('tblPsychReviewOfSystemsMasterLink')
        .whereHas('tblPsychReviewOfSystemsMasterLink', (query) => {
          query.where('psychReviewOfSystemsCategory', 'Time in psychotherapy')
        })
        .where('ROW_END', 2147483647.999999)
        .get()

      console.log('timeInPsychotherapyExists', timeInPsychotherapyExists)

      if (timeInPsychotherapyExists.length > 0) {
        for (let i = 0; i < arOfObjectsFromClientSideMasterDB.length; i++) {
          console.log(arOfObjectsFromClientSideMasterDB[i])
          if (
            arOfObjectsFromClientSideMasterDB[i].psychReviewOfSystemsCategory ===
            'Time in psychotherapy'
          ) {
            if (
              arOfObjectsFromClientSideMasterDB[i].tblPsychReviewOfSystemsForPatientLink !== null
            ) {
              console.log('row is there in client table.')
            } else {
              console.log(
                'delete the row where category=Time in psychotherapy from array of ros allowed to be chosen by patient'
              )
              arOfObjectsFromClientSideMasterDB.splice(i, 1)
              i = i - 1
            }
          }
        }
      }

      // Rule3: If one Time in psychotherapy then do not show others
      let totalTimeWithPatientExists = clientSideTblPatientPsychReviewOfSystems
        .query()
        .with('tblPsychReviewOfSystemsMasterLink')
        .whereHas('tblPsychReviewOfSystemsMasterLink', (query) => {
          query.where('psychReviewOfSystemsCategory', 'Total time with patient')
        })
        .where('ROW_END', 2147483647.999999)
        .get()

      console.log('timeInPsychotherapyExists', totalTimeWithPatientExists)

      if (totalTimeWithPatientExists.length > 0) {
        for (let i = 0; i < arOfObjectsFromClientSideMasterDB.length; i++) {
          console.log(arOfObjectsFromClientSideMasterDB[i])
          if (
            arOfObjectsFromClientSideMasterDB[i].psychReviewOfSystemsCategory ===
            'Total time with patient'
          ) {
            if (
              arOfObjectsFromClientSideMasterDB[i].tblPsychReviewOfSystemsForPatientLink !== null
            ) {
              console.log('row is there in client table.')
            } else {
              console.log(
                'delete the row where category=Time in psychotherapy from array of ros allowed to be chosen by patient'
              )
              arOfObjectsFromClientSideMasterDB.splice(i, 1)
              i = i - 1
            }
          }
        }
      }

      // End: Now group the SS

      const ar = this.groupBy(arOfObjectsFromClientSideMasterDB, 'psychReviewOfSystemsCategory')

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
    mfCheckIfThisExistsInChildTable(pros) {
      // I am able to get the data from child table.
      if (pros.tblPsychReviewOfSystemsForPatientLink) {
        if (pros.tblPsychReviewOfSystemsForPatientLink.ROW_END === 2147483647.999999) {
          return true
        }
      }
      return false
    },
    mfTogglePsychReviewOfSystems(pPsychReviewOfSystemsMasterId) {
      const exists = clientSideTblPatientPsychReviewOfSystems
        .query()
        .where('psychReviewOfSystemsMasterId', pPsychReviewOfSystemsMasterId)
        .where('ROW_END', 2147483647.999999)
        .get()
      if (exists.length > 0) {
        clientSideTblPatientPsychReviewOfSystems.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            ROW_END: Math.floor(Date.now() / 1000),
          },
        })
      } else {
        clientSideTblPatientPsychReviewOfSystems.insert({
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
  grid-gap: 40px;
  grid-auto-flow: row; /* This is default value */
  margin: 40px;
}
</style>
