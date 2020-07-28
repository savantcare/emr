<template>
  <div>
    <el-form>
      <div v-if="cfGetOrmEditStateRows.length">
        <el-form-item v-for="ormRow in cfGetOrmEditStateRows" :key="ormRow.id">
          <el-col>
            <el-input
              placeholder="Please input"
              :value="mfGetField(1, 'msg')"
              @input="mfSetFieldUsingCache($event, ormRow.id, 'msg')"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-button
              plain
              type="warning"
              style="float: right;"
              @click="mfDeleteRowInOrm(ormRow.id)"
              >Remove</el-button
            >
          </el-col>
        </el-form-item>
      </div>
      <p v-else>{{ mfAddEmptyRowInOrm() }}</p>
    </el-form>
  </div>
</template>
<script>
import ormHw from '../db/vuex-orm/helloworld.js' // Path without @ can be resolved by vsCode. Hence do not use webpack specific @ sign that represents src folder.

export default {
  computed: {
    cfGetOrmEditStateRows() {
      return ormHw.getNewRowsInEditState()
    },
  },
  methods: {
    async mfAddEmptyRowInOrm() {
      const arFromORM = await ormRem.insert({
        data: {
          msg: '',
          rowStateInThisSession: 2, // For meaning of diff values read ptclient/docs/forms.md
        },
      })
      if (!arFromORM) {
        console.log('FATAL ERROR')
      }
    },
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
