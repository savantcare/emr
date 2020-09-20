<template>
  <div>
    From Ninth chapter - Hello {{ cfMsg }}
    <el-button style="padding: 3px" type="success" plain @click="mfOpenCtInCl"
      >A</el-button
    >
  </div>
</template>
<script>
import ormHelloWorld from "@/components/book/c07-element-orm-connect-many-rows/db/client-side/helloworld.js";
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
  },
  mounted() {
    ormHelloWorld.insert({ data: { id: 1, msg: "John" } });
    console.log(ormHelloWorld);
  },
  methods: {
    mfOpenCtInCl() {
      this.$store.commit("mtfShowNewFirstTabInClFromSearchPhrase", {
        searchTerm: "Ninth chapter - change",
      });
    },
  },
};
</script>
