<template>
  <div>
    <h5>Temperature</h5>
    <el-button
      :type="cfTypeOfButton"
      plain
      :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1"
      size="small"
      >{{ cfTemperature['temperatureInFarehnite'] }}</el-button
    >
    <el-button :type="cfTypeOfButton" plain size="small">{{
      cfTemperature['dateOfMeasurement']
    }}</el-button>
    <el-button :type="cfTypeOfButton" plain size="small">{{ cfTemperature['notes'] }}</el-button>
    <el-button
      type="primary"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(cfTemperature['id'])"
      >C</el-button
    >
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-server-db-mixin'
import orm from '../db/orm-temperature.js'
export default {
  mixins: [mxFullSyncWithDbServer],
  data() {
    return {
      isMounted: false,
    }
  },
  computed: {
    cfTemperature() {
      if (!this.isMounted) return false

      const arFromOrm = orm.getValidUniqueUuidNotEmptyRows('temperatureInFarehnite')
      if (arFromOrm.length) {
        return arFromOrm[0]
      } else {
        return ''
      }
    },
    cfPosInArCardsInPtsOfVl() {
      if (!this.isMounted) return false
      const arCardsInCsOfVl = this.$store.state.vstObjCardsInCsOfVl.arCardsInCsOfVl
      const obj = arCardsInCsOfVl.find((x) => x.label === 'temperature')
      const idx = arCardsInCsOfVl.indexOf(obj)
      return idx
    },
    cfTypeOfButton() {
      if (!this.isMounted) return 'info'
      const arFromOrm = orm.getValidUniqueUuidNotEmptyRows('temperatureInFarehnite')
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
    console.log(orm)

    if (orm.query().count() > 0) {
    } else {
      console.log(orm)

      await this.mxGetDataFromDb() // mixin fns are copied into the ct where the mixin is used.
    }
    console.log(orm)
    this.isMounted = true
  },
  methods: {
    mfOpenCCtInCl(pOrmId) {
      const payload = { searchTerm: 'temperature - change', pPropsToGiveToCt: pOrmId }
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', payload)
    },
  },
}
</script>
