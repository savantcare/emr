# in template we are using element.io Components use ref :
https://element.eleme.io/#/en-US/component/button # check for event Handling for @click in line 8
ref: https://vuejs.org/v2/guide/events.html

<template>
  <div>
    From Third chapter - Hello world
    <el-button style="padding: 3px;" type="success" plain @click="mfOpenCtInCl">A</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    mfOpenCtInCl() {
      /**
       * this will trigger the follwing function mentioned in
       * ptclient/cts/core/manage-cl-tabs/vst-of-tabs-and-dialog-in-cl.js:67
       */
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'Third chapter - change',
      })
    },
  },
}
</script>
