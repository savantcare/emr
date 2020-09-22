<template>
  <div>
    From Tenth chapter - Hello {{ cfMsg }}
    <el-button
      style="padding: 3px"
      type="success"
      plain
      @click="mfOpenCtInCl"
      class="el-icon-circle-plus-outline"
    ></el-button>
    <el-table
      :data="cfArForDisplayInTable"
      :show-header="false"
      size="mini"
      style="width: 100%"
      :stripe="true"
      :row-class-name="mfGetCssClassName"
      @selection-change="mfHandleSelectionForDiscontinue"
    >
      <el-table-column prop="msg"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import ormHelloWorld from "@/components/book/c10-system-versioned-vl-data/db/client-side/helloworld.js";
export default {
  computed: {
    cfMsg() {
      const arFromClientSideTable = ormHelloWorld.query().get();
      if (arFromClientSideTable.length > 0) {
        console.log(arFromClientSideTable);
        return arFromClientSideTable[0].msg;
      }
      return "";
    },
    cfArForDisplayInTable() {
      // TODO: change this from Ar to Obj since JS ar has numerical indexes.
      const arFromClientSideTable = ormHelloWorld.fnGetNotEmptyRows("msg");
      return arFromClientSideTable;
    },
  },
  mounted() {
    ormHelloWorld.insert({ data: { id: 1, msg: "John" } });
    console.log(ormHelloWorld);
  },
  methods: {
    mfOpenCtInCl() {
      this.$store.commit("mtfShowNewFirstTabInClFromSearchPhrase", {
        searchTerm: "Tenth chapter - change",
      });
    },
  },
};
</script>
