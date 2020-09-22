<template>
  <div>
    From Third chapter - Hello world
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
export default {
  methods: {
    mfOpenCtInCl() {
      this.$store.commit("mtfShowNewFirstTabInClFromSearchPhrase", {
        searchTerm: "Third chapter - change",
      });
    },
  },
};
</script>
