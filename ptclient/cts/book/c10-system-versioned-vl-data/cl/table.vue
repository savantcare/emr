<template>
  <div>
    Tenth chapter
    <el-form>
      <div v-if="cfGetOrmNewRowsInEditState.length">
        <el-form-item v-for="ormRow in cfGetOrmNewRowsInEditState" :key="ormRow.id">
          <el-col>
            <el-input
              placeholder="Please input"
              :value="mfGetFieldValue(ormRow.id, 'msg')"
              @input="mfSetFieldValueUsingCache($event, ormRow.id, 'msg')"
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
        <el-button type="warning" plain @click="mfResetForm">Reset form</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ormHw from '@/cts/book/c10-system-versioned-vl-data/db/vuex-orm/helloworld.js'
export default {
  computed: {
    cfGetOrmNewRowsInEditState() {
      return ormHw.getNewRowsInEditState()
    },
  },
  methods: {
    async mfAddEmptyRowInOrm() {
      const arFromORM = await ormHw.insert({
        data: {
          msg: '',
          vnRowStateInSession: 2, // For meaning of diff values read ptclient/cts/core/crud/forms.md
        },
      })
      if (!arFromORM) {
        console.log('FATAL ERROR')
      }
    },
    mfGetFieldValue(pOrmRowId, pFieldName) {
      const value = ormHw.getFieldValue(pOrmRowId, pFieldName)
      return value
    },
    mfSetFieldValueUsingCache(pEvent, pOrmRowId, pFieldName) {
      const rowStatus = 24
      ormHw.setFieldValue(pEvent, pOrmRowId, pFieldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/putFieldValueInCache
    },
    async mfDeleteRowInOrm(pOrmRowId) {
      await ormHw.delete(pOrmRowId)
    },
    mfResetForm(formName) {
      ormHw.deleteNewRowsInEditState()
    },
  },
}
</script>
