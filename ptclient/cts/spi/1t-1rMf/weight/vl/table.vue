<template>
  <div>
    <el-button :type="cfTypeOfButton" plain :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1">{{
      cfWeight['firstWeight']
    }}</el-button>
    <el-button :type="cfTypeOfButton" plain>{{ cfWeight['middleWeight'] }}</el-button>
    <el-button :type="cfTypeOfButton" plain>{{ cfWeight['lastWeight'] }}</el-button>
    <el-button
      type="primary"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(cfWeight['id'])"
      >C</el-button
    >
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-server-db-mixin'
import orm from '../db/orm-weight.js'
export default {
  mixins: [mxFullSyncWithDbServer],

  computed: {
    cfWeight() {
      const arFromOrm = orm.getValidUniqueUuidNotEmptyRows('firstWeight')
      if (arFromOrm.length) {
        return arFromOrm[0]
      } else {
        return ''
      }
    },
    cfPosInArCardsInPtsOfVl() {
      const arCardsInCsOfVl = this.$store.state.vstObjCardsInCsOfVl.arCardsInCsOfVl
      const obj = arCardsInCsOfVl.find((x) => x.label === 'weight')
      const idx = arCardsInCsOfVl.indexOf(obj)
      return idx
    },
    cfTypeOfButton() {
      const arFromOrm = orm.getValidUniqueUuidNotEmptyRows('firstWeight')
      if (arFromOrm.length === 0) return 'info'
      const strOfNumber = arFromOrm[0].vnRowStateInSession.toString()
      const lastCharecter = strOfNumber.slice(-1)
      if (lastCharecter === '4' || lastCharecter === '6') {
        return 'warning'
      }
      return 'info'
    },
  },
  async mounted() {
    if (orm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb() // mixin fns are copied into the ct where the mixin is used.
    }
  },
  methods: {
    mfOpenCCtInCl(pOrmId) {
      const payload = { searchTerm: 'weight - change', pPropsToGiveToCt: pOrmId }
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', payload)
    },
  },
}
</script>
