<!-- Reference implementation 
Why copy the code to other components and not use mixin?
This is the structure and others are supposed to write their own custom code.
-->
<template>
  <div>
    <h5 v-if="formType === 'stand-alone'">Name</h5>
    <!-- Passing name of the fld so mfTypeOfButton can decide if the fld is changed or not -->
    <el-button
      :type="mfTypeOfButton('firstName')"
      plain
      :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1"
      >{{ cfDataRow['firstName'] }}</el-button
    >
    <el-button :type="mfTypeOfButton('middleName')" plain>{{ cfDataRow['middleName'] }}</el-button>
    <el-button :type="mfTypeOfButton('lastName')" plain>{{ cfDataRow['lastName'] }}</el-button>
    <el-button
      v-if="formType === 'stand-alone'"
      type="primary"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(cfDataRow['id'])"
      >C</el-button
    >
    <el-button
      v-if="dataFldsOfCopiedAndToChangeRowsAreSame !== true && formType === 'stand-alone'"
      type="success"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfSendSubmitEvent()"
      >S</el-button
    >
    <el-button
      v-if="dataFldsOfCopiedAndToChangeRowsAreSame !== true && formType === 'stand-alone'"
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
// Option1: Desired. Once this works then name, height, weight can share the same mixin-view-layer.js
// import mxTable from '@/cts/spi/1t-1rMf/mixins/mixin-view-layer.js'

// Option2: Working. But in this option the same file '../mixin-view-layer.js' has to be kept in each folder like height weight name
import mxTable from '../mixin-view-layer.js'

export default {
  mixins: [mxTable],
  props: {
    formType: {
      default: 'stand-alone',
      type: String,
    },
    date: {
      ctName: 'name', // this is supposed to be used by import mxTable from '@/cts/spi/1t-1rMf/mixins/mixin-view-layer.js so that the same mixin cab be used by name height and weight
    },
  },
}
</script>
