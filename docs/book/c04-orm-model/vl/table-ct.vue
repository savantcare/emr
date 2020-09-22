<template>
  <div>
    From Fourth chapter - Hello {{ cfMsg }}
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
import ormHelloWorld from "@/components/book/c04-orm-model/db/client-side/helloworld.js";
export default {
  computed: {
    cfMsg() {
      const arFromClientSideTable = ormHelloWorld.query().get();
      if (arFromClientSideTable.length > 0) {
        return arFromClientSideTable[0].msg;
      }
      return "";
    },
  },
  mounted() {
    ormHelloWorld.insert({ data: { id: 1, msg: "Jai krishna" } });
  },
  methods: {
    mfOpenCtInCl() {
      this.$store.commit("mtfShowNewFirstTabInClFromSearchPhrase", {
        searchTerm: "Fourth chapter - change",
      });
    },
  },
};
</script>
