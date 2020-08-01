<template>
  <div>
    <reSyncWithServerDB></reSyncWithServerDB>

    <el-button type="info" plain :tabindex="cfPosInArCardsInCsOfVl * 100 + 1">{{
      cfName['firstName']
    }}</el-button>
    <el-button type="info" plain>{{ cfName['middleName'] }}</el-button>
    <el-button type="info" plain>{{ cfName['lastName'] }}</el-button>
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
import ormName from '@/cts/spi/name/db/orm-name.js'
export default {
  components: { reSyncWithServerDB },

  computed: {
    cfName() {
      const arFromORM = ormName.getValidUniqueUuidNotEmptyRows('firstName')
      if (arFromORM.length) {
        debugger
        return arFromORM[0]
      }
    },
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
