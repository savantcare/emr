<template>
  <div>
    From Seventh chapter - Hello {{ cfMsg }}
    <el-button style="padding: 3px" type="success" plain @click="mfOpenCtInCl"
      >A</el-button
    >
  </div>
</template>
<script>
import ormHelloWorld from "@/components/book/c07-element-orm-connect-many-rows/db/client-side-db/helloworld.js";
export default {
  computed: {
    cfMsg() {
      const arFromOrm = ormHelloWorld.query().get();
      if (arFromOrm.length > 0) {
        console.log(arFromOrm);
        return arFromOrm[0].msg;
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
        searchTerm: "Seventh chapter - change",
      });
    },
  },
};
</script>
