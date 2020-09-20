<template>
  <div>
    <input v-model="userTypedKeyword" />
    <div class="grid-container">
      <div v-for="ss in cfArOfSSForDisplayInTable" :key="ss.id">
        <el-button>{{ ss.description }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import objMasterSSTable from '../db/client-side/structure/table-master-list-of-ss.js'
export default {
  data() {
    return {
      userTypedKeyword: '',
    }
  },
  computed: {
    cfArOfSSForDisplayInTable() {
      const arOfObjectsFromClientSideDB = objMasterSSTable.fnGetValidUniqueUuidNotEmptyRows(
        'description'
      )
      const newObj = arOfObjectsFromClientSideDB.filter((x) =>
        x.description.includes(this.userTypedKeyword)
      )
      return newObj
    },
  },
  async mounted() {},
}
</script>
