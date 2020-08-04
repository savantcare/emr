<template>
  <div>
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
import fullSyncWithServerDBMixin from '../db/full-sync-with-server-db-mixin'
import ormName from '../db/orm-name.js'
export default {
  mixins: [fullSyncWithServerDBMixin],

  computed: {
    cfName() {
      const arFromOrm = ormName.getValidUniqueUuidNotEmptyRows('firstName')
      if (arFromOrm.length) {
        return arFromOrm[0]
      } else {
        return ''
      }
    },
    cfPosInArCardsInPtsOfVl() {
      const arCardsInCsOfVl = this.$store.state.vstObjCardsInCsOfVl.arCardsInCsOfVl
      const obj = arCardsInCsOfVl.find((x) => x.label === 'name')
      const idx = arCardsInCsOfVl.indexOf(obj)
      return idx
    },
    cfTypeOfButton() {
      const arFromOrm = ormName.getValidUniqueUuidNotEmptyRows('firstName')
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
    if (ormName.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb() // mixin fns are copied into the ct where the mixin is used.
    }
  },
  methods: {
    mfOpenCCtInCl(pOrmId) {
      const payload = { searchTerm: 'name - change', pPropsToGiveToCt: pOrmId }
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', payload)
    },
  },
}
</script>
