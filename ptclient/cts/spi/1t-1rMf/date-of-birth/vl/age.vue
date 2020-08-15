<!-- Master doc is at reference implementation name/vl/table-ct.vue. This file has doc unique to this ct 
Code synced with ref implementation on 4th august 2020
 -->
<template>
  <div>
    <el-button type="text" plain :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1" size="small">{{
      cfAge
    }}</el-button>
  </div>
</template>

<script>
// import moment from 'moment'

import mxTable from '../mixin-view-layer.js'
export default {
  mixins: [mxTable],
  props: {
    formType: {
      default: 'stand-alone',
      type: String,
    },
  },
  computed: {
    cfAge() {
      const currentDate = new Date()
      const currentMS = currentDate.getTime()
      const diff = currentMS - this.cfDataRow.dateOfBirthInMilliseconds
      const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
      return '(' + age + 'Y)'
      // return moment(this.cfDataRow.dateOfBirthInMilliseconds).format('MMM DD YYYY') // parse integer
    },
  },
}
</script>
