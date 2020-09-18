<template>
  <div>
    From Fourth chapter - Hello {{ cfMsg }}
    <el-button style="padding: 3px" type="success" plain @click="mfOpenCtInCl"
      >A</el-button
    >
  </div>
</template>
<script>
import ormHelloWorld from "@/components/book/c04-orm-model/db/client-side-db/helloworld.js";
export default {
  computed: {
    cfMsg() {
      const arFromOrm = ormHelloWorld.query().get();
      if (arFromOrm.length > 0) {
        return arFromOrm[0].msg;
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
