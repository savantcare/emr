// Master doc is at reference implementation name/view-layer/full-name-ct.vue. This file has doc
unique to this ct Code synced with ref implementation on 18th august 2020
<template>
  <div>
    <h5 v-if="formType === 'stand-alone'">PHQ9</h5>
    <!--
      Q) Why we are using the vaPhq9QuestionFields variable data from  mixins component db/full-sync-with-db-server-mixin.js

      Ans) the vaPhq9QuestionFields is is required for both VL and CL components. 
      Due to this we fetched data from mixins component.
      Fetched all the fields with v-for loop and displayed in the template.
     -->
    <span v-for="(question, index) in vaPhq9QuestionFields" :key="index">
      <el-button
        :type="mfTypeOfButton(question.name)"
        plain
        :tabindex="index === 0 ? cfPosInArCardsInPtsOfVl * 100 + 1 : null"
        >{{ cfDataRow[question.name] }}</el-button
      >
    </span>

    <el-button
      v-if="formType === 'stand-alone'"
      type="primary"
      size="mini"
      style="padding: 3px"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(cfDataRow['id'])"
      >C</el-button
    >
    <el-button
      v-if="dataFldsOfToChangeAndCopiedRowsAreSame !== true && formType === 'stand-alone'"
      type="success"
      size="mini"
      style="padding: 3px"
      plain
      tabindex="-1"
      @click="mfSendSubmitEvent()"
      >S</el-button
    >
    <el-button
      v-if="dataFldsOfToChangeAndCopiedRowsAreSame !== true && formType === 'stand-alone'"
      type="danger"
      size="mini"
      style="padding: 3px"
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
    date: {
      ctName: 'phq9',
    },
  },
}
</script>
