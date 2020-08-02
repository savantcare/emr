<template>
  <div>
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
import fullSyncWithServerDBMixin from '../db/full-sync-with-server-db-mixin'
import ormName from '@/cts/spi/name/db/orm-name.js'
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
      console.log(arCardsInCsOfVl)
      const obj = arCardsInCsOfVl.find((x) => x.label === 'name')
      const idx = arCardsInCsOfVl.indexOf(obj)
      console.log(idx)
      return idx
    },
  },
  async mounted() {
    if (ormName.length > 0) {
    } else {
      await this.getDataFromDB()
    }
  },
}
</script>
