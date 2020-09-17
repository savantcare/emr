<!-- Reference implementation for non numeric hence no graph-->
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
      v-if="dataFldsOfToChangeAndCopiedRowsAreSame !== true && formType === 'stand-alone'"
      type="success"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfSendSubmitEvent()"
      >S</el-button
    >
    <el-button
      v-if="dataFldsOfToChangeAndCopiedRowsAreSame !== true && formType === 'stand-alone'"
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
/* Option1: 

import mxTable from '@/cts/pt-info/single/1t-1row-mField/com-mx/mixins/view-layer.js'

Desired. Once this works then name, height, weight can share the same mixin-view-layer.js
But inside /com-mx/mixins/view-layer.js I am not able to import the correct 
import mxFullSyncWithDbServer from './db/full-sync-with-db-server-mixin'

Since relative paths current working directory is /com-mx/

Posted the question on 
stackoverflow: https://stackoverflow.com/questions/63373084/relative-path-getting-resolved-from-location-of-imported-file
Discord: https://discord.com/channels/325477692906536972/325479107012067328/743027109659672616

*/

/* option 2:
const mxTable = require('../com-mx/view-layer.js').default         -> Works
Why use this?
Require allows to pass variable names Ref: https://stackoverflow.com/questions/13151693/passing-arguments-to-require-when-loading-module
Problem:
const mxTable = require('../com-mx/view-layer.js')('weight').default -> Does not work
*/

/* Option3: Working. But in this option the same file '../com-mx/view-layer.js' has to be kept in each folder like height weight name */
import mxViewLayer from '../com-mx/view-layer.js'

export default {
  mixins: [mxViewLayer],
  props: {
    formType: {
      default: 'stand-alone',
      type: String,
    },
    date: {
      ctName: 'name', // this is supposed to be used by import mxTable from '@/cts/pt-info/single/1t-1row-mField/com-mx/mixins/view-layer.js so that the same mixin cab be used by name height and weight
    },
  },
}
</script>
