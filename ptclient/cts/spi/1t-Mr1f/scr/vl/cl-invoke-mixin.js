// Master doc is at reference implementation rem/vl/cl-invoke-mixin.js.
// This file has doc unique to this ct Code synced with ref implementation on 14th sept 2020

export default {
  methods: {
    mxOpenACtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'add screen',
      })
    },
    mxOpenGCtInCl() {
      console.log('all screen graph')
    },
    mxOpenTCtInCl(pOrmDataRowId) {
      console.log('take a screen')
    },
    mxOpenGPrompt(pOrmDataRowId) {
      console.log('screen graph')
    },
    mxHandleSelectionForDiscontinue(val) {
      this.daSelectedRemForDiscontinue = val
    },
  },
}
