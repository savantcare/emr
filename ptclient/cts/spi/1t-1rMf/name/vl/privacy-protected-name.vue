<!-- Reference implementation for non numeric hence no graph-->
<template>
  <div>
    <el-button type="text"
      >{{ cfDataRow['firstName'] }} {{ initialMiddleName }} {{ initialLastName }}</el-button
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
      console.log(this.cfDataRow.middleName)
      if (this.cfDataRow.middleName) {
        return this.cfDataRow.middleName.charAt(0)
      } else {
        return ''
      }
    },
    initialLastName() {
      console.log(this.cfDataRow.lastName)
      if (this.cfDataRow.lastName) {
        return this.cfDataRow.lastName.charAt(0)
      } else {
        return ''
      }
    },
  },
}
</script>
