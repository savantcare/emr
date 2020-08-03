<template>
  <div>
    <el-button :type="cfTypeOfButton" plain :tabindex="cfPosInArCardsInCsOfVl * 100 + 1">{{
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
      const arFromORM = ormName.getValidUniqueUuidNotEmptyRows('firstName')
      if (arFromORM.length) {
        return arFromORM[0]
      } else {
        return ''
      }
    },
    cfPosInArCardsInCsOfVl() {
      const arCardsInCsOfVl = this.$store.state.vstObjCardsInCsOfVl.arCardsInCsOfVl
      const obj = arCardsInCsOfVl.find((x) => x.label === 'name')
      const idx = arCardsInCsOfVl.indexOf(obj)
      return idx
    },
    cfTypeOfButton() {
      const arFromORM = ormName.getValidUniqueUuidNotEmptyRows('firstName')
      if (arFromORM.length) {
        if (arFromORM[0].vnRowStateInSession !== 1) return 'warning'
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
      console.log(pOrmId)
      const payload = { searchTerm: 'name - change', pPropsToGiveToCt: pOrmId }

      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', payload)
    },
  },
}
</script>
