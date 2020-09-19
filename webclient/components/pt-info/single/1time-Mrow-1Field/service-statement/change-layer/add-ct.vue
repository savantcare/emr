<template>
  <div>
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
  computed: {
    cfArOfSSForDisplayInTable() {
      const arFromOrm = objMasterSSTable.fnGetValidUniqueUuidNotEmptyRows('description')
      return arFromOrm
    },
  },
  async mounted() {},
}
</script>
