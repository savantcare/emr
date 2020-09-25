<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Mental status exam V2</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="mfOpenCCtInCl"
          class="el-icon-edit"
        ></el-button>
      </div>
      <div class="grid-container">
        <div v-for="ss in cfArOfMentalStatusExamForDisplay" :key="ss.clientSideUniqRowId">
          <el-button @click="mfDeleteMentalStatusExam(ss.clientSideUniqRowId)" type="primary"
            >{{ ss.tblMentalStatusExamMasterLink.mentalStatusExamCategory }}:
            {{ ss.tblMentalStatusExamMasterLink.mentalStatusExamDescription }}</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import clientSideTblMasterMentalStatusExam from '../db/client-side/structure/master-table-of-mental-status-exam.js'
import clientSideTblPatientMentalStatusExam from '../db/client-side/structure/table-mental-status-exam-of-a-patient.js'

export default {
  computed: {
    cfArOfMentalStatusExamForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblPatientMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()

      console.log(arOfObjectsFromClientSideDB)

      for (a in arOfObjectsFromClientSideDB) {
        a.mentalStatusExamCategory
      }

      const ar = this.groupBy(
        arOfObjectsFromClientSideDB,
        'tblMentalStatusExamMasterLink.mentalStatusExamCategory'
      )

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
    mfDeleteMentalStatusExam(pClientSideUniqRowId) {
      clientSideTblPatientMentalStatusExam.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },
    mfOpenCCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'edit mental status exam',
      })
    },
  },
  async mounted() {},
}
</script>
