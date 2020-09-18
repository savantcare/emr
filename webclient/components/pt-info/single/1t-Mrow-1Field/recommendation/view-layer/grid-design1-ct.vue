<!-- Reference implementation -->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Recommendations</span>
        <el-button-group style="float: right;">
          <el-button style="padding: 3px;" type="success" plain tabindex="-1" @click="mxOpenACtInCl"
            >A</el-button
          >
          <el-button style="padding: 3px;" type="primary" plain tabindex="-1" @click="mxOpenMCtInCl"
            >M</el-button
          >
          <el-button style="padding: 3px;" type="warning" plain tabindex="-1" @click="mxOpenDDialog"
            >D</el-button
          >
          <el-button style="padding: 3px;" type="info" plain tabindex="-1" @click="mxOpenXCtInCl"
            >X</el-button
          >
        </el-button-group>
      </div>
      <div class="grid-container">
        <div v-for="rec in cfArOfRecForDisplayInTable" :key="rec.id">
          <div>{{ rec.description }}</div>
          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              style="padding: 3px;"
              plain
              tabindex="-1"
              @click="mxOpenCCtInCl()"
              >C</el-button
            >
            <el-button
              type="warning"
              size="mini"
              style="padding: 3px;"
              plain
              tabindex="-1"
              @click="mxOpenDPrompt()"
              >D</el-button
            >
          </el-button-group>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-server-db-mixin'
import objOrm from '../db/client-side/structure/rec-table.js'
import clInvokeMixin from './cl-invoke-mixin.js'
export default {
  mixins: [clInvokeMixin, mxFullSyncWithDbServer],
  data() {
    return {
      tablePageNumber: 1,
      daRowStatesNotHavingCD: [2, 24, 2456, 2457, 24578],
      daSelectedRecForDiscontinue: [],
    }
  },
  computed: {
    cfLengthOfDataArray() {
      const arFromOrm = objOrm.fnGetValidUniqueUuidRows()
      return arFromOrm.length
    },

    cfArOfRecForDisplayInTable() {
      const arFromOrm = objOrm.fnGetValidUniqueUuidNotEmptyRows('description')
      const arRecsForDisplay = []
      let obj = {}
      if (arFromOrm.length) {
        let date = ''
        const startDataRowInidex = (this.tablePageNumber - 1) * 10
        const endDataRowIndex = startDataRowInidex + 10
        for (let i = startDataRowInidex; i < arFromOrm.length && i < endDataRowIndex; i++) {
          obj = {}
          obj.description = arFromOrm[i].description
          date = new Date(arFromOrm[i].ROW_START * 1000)
          obj.createdAt =
            date.toLocaleString('default', { month: 'long' }) +
            '-' +
            date.getDate() +
            '-' +
            date.getFullYear()
          obj.ROW_START = date.toLocaleString()
          obj.ROW_END = new Date(arFromOrm[i].ROW_END * 1000).toLocaleString()
          obj.vnRowStateInSession = arFromOrm[i].vnRowStateInSession
          obj.uuid = arFromOrm[i].uuid
          obj.$id = arFromOrm[i].$id
          obj.id = arFromOrm[i].id
          arRecsForDisplay.push(obj)
        }
      }
      return arRecsForDisplay
    },
  },
  async mounted() {
    if (objOrm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
    }
  },
  methods: {
    mfTablePageChanged(pNewPageNumber) {
      this.tablePageNumber = pNewPageNumber
    },
    mfHandleSelectionForDiscontinue(val) {
      this.daSelectedRecForDiscontinue = val
    },
    mfGetCssClassName(pRow, pIndex) {
      const strOfNumber = pRow.row.vnRowStateInSession.toString()
      const lastCharecter = strOfNumber.slice(-1)
      if (lastCharecter === '4' || lastCharecter === '6') {
        return 'unsaved-data'
      } else {
        return ''
      }
    },
  },
}
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-gap: 1rec;
}
</style>
