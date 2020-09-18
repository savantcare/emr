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
        <div
          v-for="rec in cfArOfRecForDisplayInTable"
          :key="rec.id"
          :style="mfGetCssClassName(rec)"
        >
          <!-- <el-button type="text">{{ rec.description }}</el-button> 
          if I use the button then a long text is not getting divided into multiple lines

          if rowStateInThisSession == 9 then the div should have a orange border
          Why we are doing this?
            Doctor is sitting infront of computer suddenly a new Rec appears. That is a confusing event.
            Instead if the new Rec that came on screen gets a orange border with top right corner saying "New rec added from socket" that is much better UX.
          -->

          <div v-if="rec.vnRowStateInSession === 9">Added from socket {{ rec.description }}</div>
          <div v-else>
            {{ rec.description }}
          </div>

          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              style="padding: 3px;"
              plain
              tabindex="-1"
              @click="mxOpenCCtInCl(rec.id)"
              >C</el-button
            >
            <el-button
              type="warning"
              size="mini"
              style="padding: 3px;"
              plain
              tabindex="-1"
              @click="mxOpenDPrompt(rec.id)"
              >D</el-button
            >
          </el-button-group>
        </div>
      </div>
      <el-pagination
        :hide-on-single-page="true"
        background
        layout="pager"
        :total="cfLengthOfDataArray"
        @current-change="mfTablePageChanged"
      >
      </el-pagination>
    </el-card>
    <ctActOnSocketMessages></ctActOnSocketMessages>
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-server-db-mixin'
import objOrm from '../db/client-side/structure/rec-table.js'
import ctActOnSocketMessages from '../change-layer/act-on-socket-messages-ct.vue'
import clInvokeMixin from './cl-invoke-mixin.js'
export default {
  components: { ctActOnSocketMessages },
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
    mfGetCssClassName(pRow) {
      const strOfNumber = pRow.vnRowStateInSession.toString()
      const lastCharecter = strOfNumber.slice(-1)
      if (lastCharecter === '4' || lastCharecter === '6') {
        return 'color: #E6A23C;'
      } else {
        return 'color: #409EFF;'
      }
    },
  },
}
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* Some other grid-template-columns options are :
  grid-template-columns: repeat(auto-fit, minmax(32rec, 1fr)); 
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fit, max(200px)); compared to minmax(200px, 1fr) there is more magin between cols and less content fits.
  */
  grid-gap: 1px;
  grid-auto-flow: row; /* This is default value */
  margin: 1px;
}
</style>
