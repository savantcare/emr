<!-- Master doc is at reference implementation name/vl/table-ct.vue. This file has doc unique to this ct 
Code synced with ref implementation on 4th august 2020
 -->
<template>
  <div>
    <h5 v-if="formType === 'stand-alone'">Waist Circumference</h5>
    <el-button
      :type="mfTypeOfButton('waistCircumferenceInInches')"
      plain
      :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1"
      size="small"
      >{{ cfDataRow['waistCircumferenceInInches'] }}</el-button
    >
    <el-button :type="mfTypeOfButton('timeOfMeasurement')" plain size="small">{{
      cfTimeOfMeasurement
    }}</el-button>
    <el-button :type="mfTypeOfButton('notes')" plain size="small">{{
      cfDataRow['notes']
    }}</el-button>
    <el-button
      type="primary"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(cfDataRow['id'])"
      >C</el-button
    >
    <el-button
      v-if="dataFldsOfToChangeAndCopiedRowsAreSame !== true"
      type="success"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfSendSubmitEvent()"
      >S</el-button
    >
    <el-button
      v-if="dataFldsOfToChangeAndCopiedRowsAreSame !== true"
      type="danger"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfSendResetFormEvent()"
      >R</el-button
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
  },
}
</script>
