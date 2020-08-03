<template>
  <div>
    From sixth chapter - Hello world
    <el-input
      placeholder="Please input"
      :value="mfGetFieldValue(1, 'msg')"
      @input="mfSetFieldValueUsingCache($event, 1, 'msg')"
    ></el-input>
  </div>
</template>
<script>
import ormHw from '../db/vuex-orm/helloworld.js' // Path without @ can be resolved by vsCode. Hence do not use webpack specific @ sign that represents src folder.

export default {
  methods: {
    mfGetFieldValue(pOrmRowId, pFieldName) {
      const value = ormHw.getFieldValue(pOrmRowId, pFieldName)
      return value
    },
    mfSetFieldValueUsingCache(pEvent, pOrmRowId, pFieldName) {
      const rowStatus = 24 // 2 is new on client and 4 is changed on client
      ormHw.setFieldValue(pEvent, pOrmRowId, pFieldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/putFieldValueInCache
    },
  },
}
</script>
