<template>
  <div>
    Ninth chapter
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
          <el-col :span="4">
            <el-button
              plain
              type="warning"
              style="float: right"
              @click="mfDeleteRowInClientSideTable(ormRow.id)"
              >Remove</el-button
            >
          </el-col>
        </el-form-item>
      </div>
      <p v-else>{{ mfAddEmptyRowInClientSideTable() }}</p>
      <el-form-item>
        <el-button type="primary" plain @click="mfAddEmptyRowInClientSideTable"
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
import ormClientSideTable from "@/components/book/c07-element-orm-connect-many-rows/db/client-side/helloworld.js";
export default {
  computed: {
    cfGetClientSideTableNewRowsInEditState() {
      return ormClientSideTable.fnGetNewRowsInEditState();
    },
  },
  methods: {
    async mfAddEmptyRowInClientSideTable() {
      const arFromClientSideTable = await ormClientSideTable.insert({
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
      const value = ormClientSideTable.fnGetFldValue(
        pClientSideRowId,
        pFldName
      );
      return value;
    },
    mfSetFldValueUsingCache(pEvent, pClientSideRowId, pFldName) {
      const rowStatus = 24;
      ormClientSideTable.fnSetFldValue(
        pEvent,
        pClientSideRowId,
        pFldName,
        rowStatus
      );
      this.$forceUpdate(); // Not able to remove it. For the different methods tried read: cts/core/manage-rows-of-table-in-client-side-orm.js:133/fnPutFldValueInCache
    },
    async mfDeleteRowInClientSideTable(pClientSideRowId) {
      await ormClientSideTable.delete(pClientSideRowId);
    },
    mfOnResetForm(formName) {
      ormClientSideTable.fnDeleteNewRowsInEditState();
    },
  },
};
</script>
