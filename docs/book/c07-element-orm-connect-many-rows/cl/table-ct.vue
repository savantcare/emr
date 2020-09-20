<template>
  <div>
    Seventh chapter
    <el-form>
      <div v-if="cfGetClientSideTableNewRowsInEditState.length">
        <el-form-item
          v-for="ormRow in cfGetClientSideTableNewRowsInEditState"
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
      <p v-else>{{ mfAddEmptyRowInClientSideTable() }}</p>
      <el-form-item>
        <el-button type="primary" plain @click="mfAddEmptyRowInClientSideTable"
          >Add more</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ormHw from "../db/client-side/helloworld.js"; // Path without @ can be resolved by vsCode. Hence do not use webpack specific @ sign that represents src folder.

export default {
  computed: {
    cfGetClientSideTableNewRowsInEditState() {
      return ormHw.fnGetNewRowsInEditState();
    },
  },
  methods: {
    async mfAddEmptyRowInClientSideTable() {
      const arFromClientSideTable = await ormHw.insert({
        data: {
          msg: "",
          vnRowStateInSession: 2, // For meaning of diff values read webclient/cts/core/crud/forms.md
        },
      });
      if (!arFromClientSideTable) {
        console.log("FATAL ERROR");
      }
    },
    mfGetFldValue(pClientSideRowId, pFldName) {
      const value = ormHw.fnGetFldValue(pClientSideRowId, pFldName);
      return value;
    },
    mfSetFldValueUsingCache(pEvent, pClientSideRowId, pFldName) {
      const rowStatus = 24;
      ormHw.fnSetFldValue(pEvent, pClientSideRowId, pFldName, rowStatus);
      this.$forceUpdate(); // Not able to remove it. For the different methods tried read: cts/core/crud/manage-rows-of-table-in-client-side-orm.js:133/fnPutFldValueInCache
    },
  },
};
</script>
