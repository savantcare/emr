<!-- Reference implementation for non numeric hence no graph-->
<template>
  <div>
    <el-button type="text"
      >{{ cfLatestDataRowFromClientSideTable['firstName'] }} {{ initialMiddleName }}
      {{ initialLastName }}</el-button
    >
  </div>
</template>

<script>
import mxViewLayer from '../com-mx/view-layer.js'

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
      // console.log(this.cfLatestDataRowFromClientSideTable.middleName)
      if (this.cfLatestDataRowFromClientSideTable.middleName) {
        return this.cfLatestDataRowFromClientSideTable.middleName.charAt(0)
      } else {
        return ''
      }
    },
    initialLastName() {
      // console.log(this.cfLatestDataRowFromClientSideTable.lastName)
      if (this.cfLatestDataRowFromClientSideTable.lastName) {
        return this.cfLatestDataRowFromClientSideTable.lastName.charAt(0)
      } else {
        return ''
      }
    },
  },
}
</script>
