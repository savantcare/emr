<template>
  <div>
    <el-card class="box-card" :body-style="{ paddingLeft: '3px' }">
      <div slot="header" class="clearfix">
        <span
          :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1"
          @keyup="mfKeyPress($event, 'header')"
        >Screening</span>
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
      <el-timeline style="padding-inline-start: 20px">
        <el-timeline-item
          v-for="row in cfArOfScrForDisplayInTable"
          :key="row.id"
          :timestamp="row.createdAt"
          :type="row.type"
          :tabindex="cfPosInArCardsInPtsOfVl * 100 + 2"
          @keyup.native="mfKeyPress($event, row.id)"
        >
          {{ row.tblScrMasterData.scientificName }}
          <el-button-group style="float: right">
            <el-button
              type="primary"
              size="mini"
              style="padding: 3px"
              plain
              tabindex="-1"
              @click="mxOpenTCtInCl(row.id)"
            >T</el-button>
            <el-button
              type="warning"
              size="mini"
              style="padding: 3px"
              plain
              tabindex="-1"
              @click="mxOpenGPrompt(row.id)"
            >G</el-button>
          </el-button-group>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
import ClientSideTblPatientScreening from '../db/client-side/structure/scr-table-patient.js'
import clInvokeMixin from './cl-invoke-mixin.js'

export default {
  mixins: [clInvokeMixin],
  data() {
    return {}
  },
  computed: {
    cfPosInArCardsInPtsOfVl() {
      const arOfCardsInPtsOfVl = this.$store.state.vstObjCardsInPtsOfVl.arOfCardsInPtsOfVl
      console.log(arOfCardsInPtsOfVl)
      const obj = arOfCardsInPtsOfVl.find((x) => x.label === 'screening')
      const idx = arOfCardsInPtsOfVl.indexOf(obj)
      return idx
    },
    cfArOfScrForDisplayInTable() {
      const arOfObjectsFromClientSideDB = ClientSideTblPatientScreening.query()
        .with('tblScrMasterData')
        .where('scrUUID', (value) => value !== 'null')
        .where('ROW_END', 2147483647.999999)
        .get()
      return arOfObjectsFromClientSideDB
    },
  },
  mounted() {},
  methods: {
    mfKeyPress(e, rowId) {
      console.log(e, rowId)
      if (rowId === 'header') {
        if (e.code === 'KeyA') {
          this.mxOpenACtInCl()
        }
        if (e.code === 'KeyG') {
          this.mxOpenGCtInCl()
        }
      } else {
        if (e.code === 'KeyT') {
          this.mxOpenTCtInCl(rowId)
        }
        if (e.code === 'KeyG') {
          this.mxOpenGPrompt(rowId)
        }
      }
    },
  },
}
</script>
