<template>
  <div>
    From Seventh chapter - Hello world
    <el-input
      placeholder="Please input"
      :value="mfGetField(1, 'msg')"
      @input="mfSetFieldUsingCache($event, 1, 'msg')"
    ></el-input>
  </div>
</template>
<script>
import ormHw from '../db/vuex-orm/helloworld.js' // Path without @ can be resolved by vsCode. Hence do not use webpack specific @ sign that represents src folder.

export default {
  methods: {
    mfGetField(pOrmRowId, pFieldName) {
      const value = ormHw.getField(pOrmRowId, pFieldName)
      return value
    },
    mfSetFieldUsingCache(pEvent, pOrmRowId, pFieldName) {
      const rowStatus = 24
      ormHw.setField(pEvent, pOrmRowId, pFieldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/putFieldValueInCache
    },
  },
}
</script>
