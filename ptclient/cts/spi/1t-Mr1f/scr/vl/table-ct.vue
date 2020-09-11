// Master doc is at reference implementation rem/vl/table-ct.vue. This file has doc unique to this
ct Code synced with ref implementation on 11th sept 2020
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Screening</span>
        <el-button-group style="float: right">
          <el-button style="padding: 3px" type="success" plain tabindex="-1" @click="mxOpenACtInCl"
            >A</el-button
          >
          <el-button style="padding: 3px" type="primary" plain tabindex="-1" @click="mxOpenGCtInCl"
            >G</el-button
          >
        </el-button-group>
      </div>
      <el-table
        :data="cfArOfScrForDisplayInTable"
        :show-header="false"
        size="mini"
        style="width: 100%"
        :stripe="true"
        :row-class-name="mfGetCssClassName"
        @selection-change="mfHandleSelectionForDiscontinue"
      >
        <el-table-column type="selection" width="42" tabindex="-1"> </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <p>Created: {{ props.row.createdAt }}</p>
            <p>Row start: {{ props.row.ROW_START }}</p>
            <p>Row end: {{ props.row.ROW_END }}</p>
            <p>uuid: {{ props.row.uuid }}</p>
            <p>id: {{ props.row.id }}</p>
          </template>
        </el-table-column>

        <el-table-column prop="scientificName" label="Screen name"> </el-table-column>
        <el-table-column label="Actions" width="60">
          <template slot-scope="props">
            <el-button-group v-if="!daRowStatesNotHavingCD.includes(props.row.vnRowStateInSession)">
              <el-button
                type="primary"
                size="mini"
                style="padding: 3px"
                plain
                tabindex="-1"
                @click="mxOpenTCtInCl(props.row.id)"
                >T</el-button
              >
              <el-button
                type="warning"
                size="mini"
                style="padding: 3px"
                plain
                tabindex="-1"
                @click="mxOpenGPrompt(props.row.id)"
                >G</el-button
              >
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :hide-on-single-page="true"
        background
        layout="pager"
        :total="cfLengthOfDataArray"
        @current-change="mfTablePageChanged"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-server-db-mixin'
import objOrm from '../db/vuex-orm/orm.js'
import clInvokeMixin from './cl-invoke-mixin.js'
export default {
  mixins: [clInvokeMixin, mxFullSyncWithDbServer],
  data() {
    return {
      tablePageNumber: 1,
      daRowStatesNotHavingCD: [2, 24, 2456, 2457, 24578],
      daSelectedScrForDiscontinue: [],
    }
  },
  computed: {
    cfLengthOfDataArray() {
      const arFromOrm = objOrm.fnGetValidUniqueUuidRows()
      return arFromOrm.length
    },
    cfArOfScrForDisplayInTable() {
      const arFromOrm = objOrm.fnGetValidUniqueUuidNotEmptyRows('scientificName')

      const arScrsForDisplay = []
      let obj = {}
      if (arFromOrm.length) {
        let date = ''
        const startDataRowInidex = (this.tablePageNumber - 1) * 10
        const endDataRowIndex = startDataRowInidex + 10
        for (let i = startDataRowInidex; i < arFromOrm.length && i < endDataRowIndex; i++) {
          obj = {}
          obj.scientificName = arFromOrm[i].scientificName
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
          arScrsForDisplay.push(obj)
        }
      }
      return arScrsForDisplay
    },
  },
  async mounted() {
    if (objOrm.query().count() > 0) {
      console.log('no data')
    } else {
      console.log('data from db')
      await this.mxGetDataFromDb()
    }
  },
  methods: {
    mfTablePageChanged(pNewPageNumber) {
      this.tablePageNumber = pNewPageNumber
    },
    mfHandleSelectionForDiscontinue(val) {
      this.daSelectedScrForDiscontinue = val
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
tr.el-table__row.unsaved-data {
  background: #fde2b9;
}
.el-table--striped .el-table__body tr.el-table__row--striped.unsaved-data td {
  background: #f9d399;
}
</style>
