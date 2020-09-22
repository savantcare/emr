<template>
  <div>
    From sixth chapter - Hello {{ cfMsg }}
    <el-button
      style="padding: 3px"
      type="success"
      plain
      @click="mfOpenCtInCl"
      class="el-icon-circle-plus-outline"
    ></el-button>
  </div>
</template>
<script>
import ormHelloWorld from "@/components/book/c06-form-to-orm/db/client-side/helloworld.js";
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
        searchTerm: "Sixth chapter - change",
      });
    },
  },
};
</script>
