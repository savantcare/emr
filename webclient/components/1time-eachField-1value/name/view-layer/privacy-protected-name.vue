<!-- Reference implementation for non numeric hence no graph-->
<template>
  <div>
    <el-button type="text"
      >{{ cfLatestDataRowFromClientTbl['firstName'] }} {{ initialMiddleName }} {{ initialLastName }}</el-button
    >
  </div>
</template>

<script>
import mxViewLayer from '../code-common-for-all-1r-mf/view-layer.js'

export default {
  mixins: [mxViewLayer],
  props: {
    formType: {
      default: 'stand-alone',
      type: String,
    },
    date: {
      ctName: 'name',
    },
  },
  computed: {
    initialMiddleName() {
      // console.log(this.cfLatestDataRowFromClientTbl.middleName)
      if (this.cfLatestDataRowFromClientTbl.middleName) {
        return this.cfLatestDataRowFromClientTbl.middleName.charAt(0)
      } else {
        return ''
      }
    },
    initialLastName() {
      // console.log(this.cfLatestDataRowFromClientTbl.lastName)
      if (this.cfLatestDataRowFromClientTbl.lastName) {
        return this.cfLatestDataRowFromClientTbl.lastName.charAt(0)
      } else {
        return ''
      }
    },
  },
}
</script>
