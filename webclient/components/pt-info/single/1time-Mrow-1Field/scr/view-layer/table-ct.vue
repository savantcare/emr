<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Screening</span>
        <el-button-group style="float: right">
          <el-button
            style="padding: 3px"
            type="success"
            plain
            tabindex="-1"
            @click="mxOpenACtInCl"
          >A</el-button>
          <el-button
            style="padding: 3px"
            type="primary"
            plain
            tabindex="-1"
            @click="mxOpenGCtInCl"
          >G</el-button>
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
        <el-table-column prop="tblScrMasterData.scientificName" label="Screen name"></el-table-column>
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
              >T</el-button>
              <el-button
                type="warning"
                size="mini"
                style="padding: 3px"
                plain
                tabindex="-1"
                @click="mxOpenGPrompt(props.row.id)"
              >G</el-button>
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
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import mxScrMasterData from '../db/client-side/static-data/scr-master-data'
import mxFullSyncWithDbServer from '../db/full-sync-with-server-db-mixin'
import ClientSideTblPatientScreening from '../db/client-side/structure/scr-table-patient.js'
import clInvokeMixin from './cl-invoke-mixin.js'
export default {
  mixins: [clInvokeMixin, mxFullSyncWithDbServer, mxScrMasterData],
  data() {
    return {
      tablePageNumber: 1,
      daRowStatesNotHavingCD: [2, 24, 2456, 2457, 24578],
      daSelectedScrForDiscontinue: [],
    }
  },
  computed: {
    cfLengthOfDataArray() {
      const arFromOrm = ClientSideTblPatientScreening.fnGetValidUniqueUuidRows()
      return arFromOrm.length
    },
    cfArOfScrForDisplayInTable() {
      const arOfObjectsFromClientSideDB = ClientSideTblPatientScreening.query()
        .with('tblScrMasterData')
        .where('scrUUID', (value) => value.length > 0)
        .where('ROW_END', 2147483647.999999)
        .get()
      return arOfObjectsFromClientSideDB
    },
  },
  async mounted() {
    if (ClientSideTblPatientScreening.query().count() > 0) {
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
