<!-- Reference implementation -->
<template>
  <div>
    <h5>Name</h5>
    <el-button :type="cfTypeOfButton" plain :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1">{{
      cfName['firstName']
    }}</el-button>
    <el-button :type="cfTypeOfButton" plain>{{ cfName['middleName'] }}</el-button>
    <el-button :type="cfTypeOfButton" plain>{{ cfName['lastName'] }}</el-button>
    <el-button
      type="primary"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(cfName['id'])"
      >C</el-button
    >
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'
import orm from '../db/orm-name.js'
export default {
  mixins: [mxFullSyncWithDbServer],
  data() {
    return {
      isMounted: false,
      isCopiedRowDiff: false,
    }
  },
  computed: {
    cfName() {
      if (!this.isMounted) return ''
      const arFromOrm = orm.getValidUniqueUuidNotEmptyRows('firstName')
      if (arFromOrm.length) {
        return arFromOrm[0]
      } else {
        return ''
      }
    },
    /* 
      This is required for tab indexing 
      if this is pos 0 then tab index is set as 1 
      if this is pos 1 then tab index is set as 101 
      So the first card on ptsVl will get tabIndex as 1
      So the 2nd card on ptsVl will get tabIndex as 101
      So when the user presses tab 
        first Card 1 will focus
        2nd the card 2 will focus
      */
    cfPosInArCardsInPtsOfVl() {
      if (!this.isMounted) return false
      const arCardsInCsOfVl = this.$store.state.vstObjCardsInCsOfVl.arCardsInCsOfVl
      const obj = arCardsInCsOfVl.find((x) => x.label === 'name')
      const idx = arCardsInCsOfVl.indexOf(obj)
      return idx
    },
    cfTypeOfButton() {
      if (this.isCopiedRowDiff === true) {
        return 'warning'
      }
      return 'primary'
    },
  },
  async mounted() {
    this.$root.$on('event-from-ct-name-copied-row-diff', () => {
      this.isCopiedRowDiff = true
    })
    this.$root.$on('event-from-ct-name-copied-row-same', () => {
      this.isCopiedRowDiff = false
    })

    if (orm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb() // mixin fns are copied into the ct where the mixin is used.
    }
    this.isMounted = true
  },
  methods: {
    mfOpenCCtInCl(pOrmId) {
      const payload = { searchTerm: 'name - change', pPropsToGiveToCt: pOrmId }
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', payload)
    },
  },
}
</script>
