<template>
  <div>
    <el-input
      placeholder="First name"
      :value="mfGetField(1, 'firstName')"
      @input="mfSetFieldUsingCache($event, 1, 'firstName')"
    >
    </el-input>
    <el-input
      placeholder="Middle name"
      :value="mfGetField(1, 'middleName')"
      @input="mfSetFieldUsingCache($event, 1, 'middleName')"
    ></el-input>
    <el-input
      placeholder="Last name"
      :value="mfGetField(1, 'lastName')"
      @input="mfSetFieldUsingCache($event, 1, 'lastName')"
    ></el-input>
  </div>
</template>

<script>
import fullSyncWithServerDBMixin from '../db/full-sync-with-server-db-mixin'
import ormName from '@/cts/spi/name/db/orm-name.js'
export default {
  mixins: [fullSyncWithServerDBMixin],

  async mounted() {
    if (ormName.length > 0) {
    } else {
      await this.getDataFromDB()
    }
  },
  methods: {
    mfGetField(pOrmRowId, pFieldName) {
      const value = ormName.getField(pOrmRowId, pFieldName)
      return value
    },
    mfSetFieldUsingCache(pEvent, pOrmRowId, pFieldName) {
      const rowStatus = 24 // 2 is new on client and 4 is changed on client
      ormName.setField(pEvent, pOrmRowId, pFieldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/putFieldValueInCache
    },
  },
}
</script>
