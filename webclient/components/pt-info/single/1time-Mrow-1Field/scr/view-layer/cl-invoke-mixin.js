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
