<template>
  <div>
    Seventh chapter
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
        </el-form-item>
      </div>
      <p v-else>{{ mfAddEmptyRowInOrm() }}</p>
      <el-form-item>
        <el-button type="primary" plain @click="mfAddEmptyRowInOrm">Add more</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ormHw from '../db/vuex-orm/helloworld.js' // Path without @ can be resolved by vsCode. Hence do not use webpack specific @ sign that represents src folder.

export default {
  computed: {
    cfGetOrmNewRowsInEditState() {
      return ormHw.getAllNewRowsInEditState()
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
    mfGetFieldValue(pOrmRowId, pFieldName) {
      const value = ormHw.getFieldValue(pOrmRowId, pFieldName)
      return value
    },
    mfSetFieldValueUsingCache(pEvent, pOrmRowId, pFieldName) {
      const rowStatus = 24
      ormHw.setFieldValue(pEvent, pOrmRowId, pFieldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/putFieldValueInCache
    },
  },
}
</script>
