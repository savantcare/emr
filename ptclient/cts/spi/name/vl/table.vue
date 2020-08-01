<template>
  <div>
    <reSyncWithServerDB></reSyncWithServerDB>

    <el-button type="info" plain :tabindex="cfPosInArCardsInCsOfVl * 100 + 1">Vikas</el-button>
    <el-button type="info" plain>Kedia</el-button>
    <el-button
      type="primary"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(props.row.$id)"
      >C</el-button
    >
  </div>
</template>

<script>
import reSyncWithServerDB from '../db/re-sync-with-server-db'
export default {
  components: { reSyncWithServerDB },

  computed: {
    cfPosInArCardsInCsOfVl() {
      const arCardsInCsOfVl = this.$store.state.vstObjCardsInCsOfVl.arCardsInCsOfVl
      console.log(arCardsInCsOfVl)
      const obj = arCardsInCsOfVl.find((x) => x.label === 'name')
      const idx = arCardsInCsOfVl.indexOf(obj)
      console.log(idx)
      return idx
    },
  },
}
</script>
