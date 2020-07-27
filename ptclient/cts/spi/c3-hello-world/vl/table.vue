<template>
  <div>
    From chapter 3 - Hello world
    <el-button style="padding: 3px;" type="success" plain @click="mfOpenCtInCl">A</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    mfOpenCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'Chapter 3 - change',
      })
    },
  },
}
</script>
