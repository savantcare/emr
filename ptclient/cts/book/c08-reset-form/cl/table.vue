<template>
  <div>
    Eigth chapter
    <el-form>
      <div v-if="cfGetOrmNewRowsInEditState.length">
        <el-form-item v-for="ormRow in cfGetOrmNewRowsInEditState" :key="ormRow.id">
          <el-col>
            <el-input
              placeholder="Please input"
              :value="mfGetField(ormRow.id, 'msg')"
              @input="mfSetFieldUsingCache($event, ormRow.id, 'msg')"
            ></el-input>
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
import ormHw from '@/cts/book/c07-element-orm-connect-many-rows/db/vuex-orm/helloworld.js'

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
    mfGetField(pOrmRowId, pFieldName) {
      const value = ormHw.getField(pOrmRowId, pFieldName)
      return value
    },
    mfSetFieldUsingCache(pEvent, pOrmRowId, pFieldName) {
      const rowStatus = 24
      ormHw.setField(pEvent, pOrmRowId, pFieldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/putFieldValueInCache
    },
    mfResetForm(formName) {
      ormHw.deleteNewRowsInEditState()
    },
  },
}
</script>
