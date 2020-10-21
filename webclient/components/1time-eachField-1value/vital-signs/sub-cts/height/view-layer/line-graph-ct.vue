<!-- Reference implementation for line graph -->
<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      style="padding: 3px"
      plain
      tabindex="-1"
      @click="
        mfOpenEditCtInEditLayer(
          cfLatestDataRowFromClientSideTable['clientSideUniqRowId'],
          'height - edit'
        )
      "
      class="el-icon-edit"
    ></el-button>
    <el-button
      v-if="dataFldsOfToChangeAndCopiedRowsAreSame !== true"
      type="success"
      size="mini"
      style="padding: 3px"
      plain
      tabindex="-1"
      @click="mfSendReviewedEvent()"
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
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import mxLineG from '../code-common-for-all-1r-mf/line-graph.js'

export default {
  mixins: [mxLineG],
}
</script>
