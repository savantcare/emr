// Master doc is at reference implementation rem/vl/timeline-ct.vue. This file has doc unique to
this ct Code synced with ref implementation on 14th sept 2020
<template>
  <div>
    <el-card class="box-card" :body-style="{ paddingLeft: '3px' }">
      <div slot="header" class="clearfix">
        <span :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1" @keyup="mfKeyPress($event, 'header')"
          >Screening</span
        >
        <el-button-group style="float: right">
          <el-button style="padding: 3px" type="success" plain tabindex="-1" @click="mxOpenACtInCl"
            >A</el-button
          >
          <el-button style="padding: 3px" type="primary" plain tabindex="-1" @click="mxOpenGCtInCl"
            >G</el-button
          >
        </el-button-group>
      </div>
      <el-timeline style="padding-inline-start: 20px">
        <el-timeline-item
          v-for="row in cfArOfScrForDisplayInTable"
          :key="row.id"
          :timestamp="row.createdAt"
          :type="row.type"
          :tabindex="cfPosInArCardsInPtsOfVl * 100 + 2"
          @keyup.native="mfKeyPress($event, row.id, row.scientificName)"
        >
          {{ row.scientificName }}
          <el-button-group style="float: right">
            <el-button
              type="primary"
              size="mini"
              style="padding: 3px"
              plain
              tabindex="-1"
              @click="mxOpenTCtInCl(row.id)"
              >T</el-button
            >
            <el-button
              type="warning"
              size="mini"
              style="padding: 3px"
              plain
              tabindex="-1"
              @click="mxOpenGPrompt(row.id)"
              >G</el-button
            >
          </el-button-group>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
import objOrm from '../db/vuex-orm/orm.js'
import clInvokeMixin from './cl-invoke-mixin.js'

export default {
  mixins: [clInvokeMixin],
  data() {
    return {}
  },
  computed: {
    cfPosInArCardsInPtsOfVl() {
      const arOfCardsInPtsOfVl = this.$store.state.vstObjCardsInPtsOfVl.arOfCardsInPtsOfVl
      const obj = arOfCardsInPtsOfVl.find((x) => x.label === 'screening')
      const idx = arOfCardsInPtsOfVl.indexOf(obj)
      return idx
    },
    cfArOfScrForDisplayInTable() {
      const arFromOrm = objOrm.fnGetValidUniqueUuidNotEmptyRows('scientificName')
      const arScrsForDisplay = []
      let obj = {}
      if (arFromOrm.length) {
        let date = ''
        for (let i = 0; i < arFromOrm.length; i++) {
          if (arFromOrm[i].scientificName !== 'null') {
            obj = {}
            obj.scientificName = arFromOrm[i].scientificName
            date = new Date(arFromOrm[i].ROW_START)
            obj.createdAt = date.toLocaleString('default', { month: 'long' }) + '-' + date.getDate()
            obj.vnRowStateInSession = arFromOrm[i].vnRowStateInSession
            obj.uuid = arFromOrm[i].uuid
            obj.id = arFromOrm[i].id
            arScrsForDisplay.push(obj)
          }
        }
      }
      return arScrsForDisplay
    },
  },
  mounted() {},
  methods: {
    mfKeyPress(e, rowId, pScrDesc) {
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
