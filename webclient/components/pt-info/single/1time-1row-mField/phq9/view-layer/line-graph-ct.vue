<!-- Reference implementation for line graph -->
<template>
  <div>
    <div v-if="formType !== 'sub-part-of-another-form'">
      <el-button
        type="primary"
        size="mini"
        style="padding: 3px"
        plain
        tabindex="-1"
        @click="mfOpenCCtInCl(cfDataRow['id'])"
        >C</el-button
      >
      <el-button
        v-if="dataFldsOfToChangeAndCopiedRowsAreSame !== true"
        type="success"
        size="mini"
        style="padding: 3px"
        plain
        tabindex="-1"
        @click="mfSendSubmitEvent()"
        >S</el-button
      >
      <el-button
        v-if="dataFldsOfToChangeAndCopiedRowsAreSame !== true"
        type="danger"
        size="mini"
        style="padding: 3px"
        plain
        tabindex="-1"
        @click="mfSendResetFormEvent()"
        >R</el-button
      >
    </div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import mxLineG from '../com-mx/line-graph.js'

export default {
  mixins: [mxLineG],
  props: {
    formType: {
      default: 'stand-alone', // sets default value of props formType to 'stand-alone'
      type: String,
    },
  },
}
</script>
