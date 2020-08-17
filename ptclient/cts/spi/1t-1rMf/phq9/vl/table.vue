<!-- Master doc is at reference implementation name/vl/table-ct.vue. This file has doc unique to this ct
Code synced with ref implementation on 4th august 2020
 -->
<template>
  <div class="content element-doc content">
    <h5>Phq9</h5>
    <el-button
      :type="cfTypeOfButton"
      plain
      :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1"
      size="small"
      >{{ cfPhq9['littleInterestOrPleasureInDoingThings'] }}</el-button
    >
    <el-button
      :type="cfTypeOfButton"
      plain
      :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1"
      size="small"
      >{{ cfPhq9['feelingDownDepressedOrHopeless'] }}</el-button
    >
    <el-button :type="cfTypeOfButton" plain size="small">{{
      cfPhq9['timeOfMeasurement']
    }}</el-button>
    <el-button :type="cfTypeOfButton" plain size="small">{{ cfPhq9['notes'] }}</el-button>
    <el-button
      type="primary"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(cfPhq9['id'])"
      >C</el-button
    >
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'
import objOrm from '../db/orm-phq9.js'
export default {
  mixins: [mxFullSyncWithDbServer],
  data() {
    return {
      isMounted: false,
      isCopiedRowDiff: false,
    }
  },
  computed: {
    cfPhq9() {
      if (!this.isMounted) return false
      const arFromOrm = objOrm.fnGetNonEmptyRowsToChange('littleInterestOrPleasureInDoingThings')
      if (arFromOrm.length) {
        return arFromOrm[0]
      } else {
        return ''
      }
    },
    cfPosInArCardsInPtsOfVl() {
      if (!this.isMounted) return false
      const arOfCardsInPtsOfVl = this.$store.state.vstObjCardsInPtsOfVl.arOfCardsInPtsOfVl
      const obj = arOfCardsInPtsOfVl.find((x) => x.label === 'phq9')
      const idx = arOfCardsInPtsOfVl.indexOf(obj)
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
    this.$root.$on('event-from-ct-phq9-copied-row-diff', () => {
      this.isCopiedRowDiff = true
    })
    this.$root.$on('event-from-ct-phq9-copied-row-same', () => {
      this.isCopiedRowDiff = false
    })

    if (objOrm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
    }
    this.isMounted = true
  },
  methods: {
    mfOpenCCtInCl(pOrmId) {
      const payload = { searchTerm: 'phq9 - change', pPropsToGiveToCt: pOrmId }
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', payload)
    },
  },
}
</script>
