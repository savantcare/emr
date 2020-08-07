<template>
  <div>
    From sixth chapter - Hello world
    <el-input
      placeholder="Please input"
      :value="mfGetFldValue(1, 'msg')"
      @input="mfSetFldValueUsingCache($event, 1, 'msg')"
    ></el-input>
  </div>
</template>
<script>
import ormHw from '../db/vuex-orm/helloworld.js' // Path without @ can be resolved by vsCode. Hence do not use webpack specific @ sign that represents src folder.

export default {
  methods: {
    mfGetFldValue(pOrmRowId, pFldName) {
      const value = ormHw.fnGetFldValue(pOrmRowId, pFldName)
      return value
    },
    mfSetFldValueUsingCache(pEvent, pOrmRowId, pFldName) {
      const rowStatus = 24 // 2 is new on client and 4 is changed on client
      ormHw.fnSetFldValue(pEvent, pOrmRowId, pFldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/fnPutFieldValueInCache
    },
  },
}
</script>
