<template>
  <div>
    <el-input placeholder="Please input" v-model="userTypedKeyword" />
    <div class="grid-container">
      <div v-for="ss in cfArOfSSForDisplayInTable" :key="ss.id">
        <el-button>{{ ss.serviceStatementDescription }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import objMasterSSTable from '../db/client-side/structure/table-master-list-of-ss.js'
import objPatientSS from '../db/client-side/structure/table-ss-of-a-patient.js'

export default {
  data() {
    return {
      userTypedKeyword: '',
    }
  },
  computed: {
    cfArOfSSForDisplayInTable() {
      const arOfObjectsFromClientSideDB = objMasterSSTable.fnGetValidUniqueUuidNotEmptyRows(
        'serviceStatementDescription'
      )
      const newObj = arOfObjectsFromClientSideDB.filter((x) =>
        x.serviceStatementDescription.includes(this.userTypedKeyword)
      )
      return newObj
    },
  },
  async mounted() {},
}
</script>
