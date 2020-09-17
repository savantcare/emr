<template>
  <div>
    Eigth chapter
    <el-form>
      <div v-if="cfGetOrmNewRowsInEditState.length">
        <el-form-item
          v-for="ormRow in cfGetOrmNewRowsInEditState"
          :key="ormRow.id"
        >
          <el-col>
            <el-input
              placeholder="Please input"
              :value="mfGetFldValue(ormRow.id, 'msg')"
              @input="mfSetFldValueUsingCache($event, ormRow.id, 'msg')"
            ></el-input>
          </el-col>
        </el-form-item>
      </div>
      <p v-else>{{ mfAddEmptyRowInOrm() }}</p>
      <el-form-item>
        <el-button type="primary" plain @click="mfAddEmptyRowInOrm"
          >Add more</el-button
        >
        <el-button type="warning" plain @click="mfOnResetForm"
          >Reset form</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ormHw from "@/cts/book/c07-element-orm-connect-many-rows/db/vuex-orm/helloworld.js";

export default {
  computed: {
    cfGetOrmNewRowsInEditState() {
      return ormHw.fnGetNewRowsInEditState();
    },
  },
  methods: {
    async mfAddEmptyRowInOrm() {
      const arFromOrm = await ormHw.insert({
        data: {
          msg: "",
          vnRowStateInSession: 2, // For meaning of diff values read webclient/cts/core/crud/forms.md
        },
      });
      if (!arFromOrm) {
        console.log("FATAL ERROR");
      }
    },
    mfGetFldValue(pOrmRowId, pFldName) {
      const value = ormHw.fnGetFldValue(pOrmRowId, pFldName);
      return value;
    },
    mfSetFldValueUsingCache(pEvent, pOrmRowId, pFldName) {
      const rowStatus = 24;
      ormHw.fnSetFldValue(pEvent, pOrmRowId, pFldName, rowStatus);
      this.$forceUpdate(); // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/fnPutFldValueInCache
    },
    mfOnResetForm(formName) {
      ormHw.fnDeleteNewRowsInEditState();
    },
  },
};
</script>
