<template>
  <div>
    Tenth chapter
    <el-form>
      <div v-if="cfGetOrmNewRowsInEditState.length">
        <el-form-item v-for="ormRow in cfGetOrmNewRowsInEditState" :key="ormRow.id">
          <el-col>
            <el-input
              placeholder="Please input"
              :value="mfGetFldValue(ormRow.id, 'msg')"
              @input="mfSetFldValueUsingCache($event, ormRow.id, 'msg')"
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
      <el-form-item>
        <el-button type="primary" plain @click="mfAddEmptyRowInOrm">Add more</el-button>
        <el-button type="warning" plain @click="mfOnResetForm">Reset form</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ormHw from '@/cts/book/c10-system-versioned-vl-data/db/vuex-orm/helloworld.js'
export default {
  computed: {
    cfGetOrmNewRowsInEditState() {
      return ormHw.fnGetNewRowsInEditState()
    },
  },
  methods: {
    async mfAddEmptyRowInOrm() {
      const arFromOrm = await ormHw.insert({
        data: {
          msg: '',
          vnRowStateInSession: 2, // For meaning of diff values read ptclient/cts/core/crud/forms.md
        },
      })
      if (!arFromOrm) {
        console.log('FATAL ERROR')
      }
    },
    mfGetFldValue(pOrmRowId, pFldName) {
      const value = ormHw.fnGetFldValue(pOrmRowId, pFldName)
      return value
    },
    mfSetFldValueUsingCache(pEvent, pOrmRowId, pFldName) {
      const rowStatus = 24
      ormHw.fnSetFldValue(pEvent, pOrmRowId, pFldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/fnPutFieldValueInCache
    },
    async mfDeleteRowInOrm(pOrmRowId) {
      await ormHw.delete(pOrmRowId)
    },
    mfOnResetForm(formName) {
      ormHw.fnDeleteNewRowsInEditState()
    },
  },
}
</script>
