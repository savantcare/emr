<template>
  <div>
    <el-button type="info" plain>{{ cfName['firstName'] }}</el-button>
    <el-button type="info" plain>{{ cfName['middleName'] }}</el-button>
    <el-button type="info" plain>{{ cfName['lastName'] }}</el-button>
  </div>
</template>

<script>
import fullSyncWithServerDBMixin from '../db/full-sync-with-server-db-mixin'
import ormName from '@/cts/spi/name/db/orm-name.js'
export default {
  mixins: [fullSyncWithServerDBMixin],
  computed: {
    cfName() {
      const arFromORM = ormName.getValidUniqueUuidNotEmptyRows('firstName')
      if (arFromORM.length) {
        return arFromORM[0]
      } else {
        return ''
      }
    },
  },
  async mounted() {
    if (ormName.length > 0) {
    } else {
      await this.getDataFromDB()
    }
  },
}
</script>
