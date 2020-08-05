<!-- Master doc is at reference implementation name/cl/c.vue. This file has doc unique to this ct
Code synced with ref implementation on 4th august 2020
 -->
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
import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'
import orm from '../db/orm.js'
export default {
  mixins: [mxFullSyncWithDbServer],
  data() {
    return {
      isMounted: false,
      isCopiedRowDiff: false,
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
      if (this.isCopiedRowDiff === true) {
        return 'warning'
      }
      return 'primary'
    },
  },
  async mounted() {
    this.$root.$on('event-from-ct-temperature-copied-row-diff', () => {
      this.isCopiedRowDiff = true
    })
    this.$root.$on('event-from-ct-temperature-copied-row-same', () => {
      this.isCopiedRowDiff = false
    })
    if (orm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
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
