<template>
  <div>
    Hello world C3
    <el-button style="padding: 3px;" type="success" plain @click="mfOpenCtInCl">A</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    mfOpenCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'hello world C3 - change',
      })
    },
  },
}
</script>
