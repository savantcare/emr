<!-- Master doc is at reference implementation name/vl/table.vue. This file has doc unique to this ct
Code synced with ref implementation on 4th august 2020
 -->
<template>
  <div class="content element-doc content">
    <h5>Height</h5>
    <el-button
      :type="cfTypeOfButton"
      plain
      :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1"
      size="small"
      >{{ cfHeight['heightInInches'] }}</el-button
    >
    <el-button :type="cfTypeOfButton" plain size="small">{{
      cfHeight['dateOfMeasurement']
    }}</el-button>
    <el-button :type="cfTypeOfButton" plain size="small">{{ cfHeight['notes'] }}</el-button>
    <el-button
      type="primary"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(cfHeight['id'])"
      >C</el-button
    >
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'
import orm from '../db/orm-height.js'
export default {
  mixins: [mxFullSyncWithDbServer],
  data() {
    return {
      isMounted: false,
      isCopiedRowDiff: false,
    }
  },
  computed: {
    cfHeight() {
      if (!this.isMounted) return false
      const arFromOrm = orm.getValidUniqueUuidNotEmptyRows('heightInInches')
      if (arFromOrm.length) {
        return arFromOrm[0]
      } else {
        return ''
      }
    },
    cfPosInArCardsInPtsOfVl() {
      if (!this.isMounted) return false
      const arCardsInCsOfVl = this.$store.state.vstObjCardsInCsOfVl.arCardsInCsOfVl
      const obj = arCardsInCsOfVl.find((x) => x.label === 'height')
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
    this.$root.$on('event-from-ct-height-copied-row-diff', () => {
      this.isCopiedRowDiff = true
    })
    this.$root.$on('event-from-ct-height-copied-row-same', () => {
      this.isCopiedRowDiff = false
    })

    if (orm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
    }
    this.isMounted = true
  },
  methods: {
    mfOpenCCtInCl(pOrmId) {
      const payload = { searchTerm: 'height - change', pPropsToGiveToCt: pOrmId }
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', payload)
    },
  },
}
</script>
