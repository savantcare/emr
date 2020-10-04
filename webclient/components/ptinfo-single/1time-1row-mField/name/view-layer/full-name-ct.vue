<!-- Reference implementation for non numeric hence no graph-->
<template>
  <div>
    <showContentInCardComponent
      propMainCardName="Name"
      :propActionsThatCanBeInvokedFromCardHeader="[
        {
          actionDescription: 'Toggle card display',
          isDefaultAction: true,
        },
        {
          actionDescription: 'Close card',
        },
      ]"
      propGridDesignTopMostParentBody="s-css-class-top-most-card-body-grid"
    >
      <!-- Passing name of the fld so mfTypeOfButton can decide if the fld is changed or not -->
      <div
        slot="bodySlotContentFromParentToShowAboveChildCards"
        class="box-card sc-individual-child-card"
      >
        <el-button-group style="float: right; display: none">
          <el-button
            style="padding: 3px; color: #c0c4cc; border: none"
            plain
            tabindex="-1"
            @click="
              mfOpenEditCtInEditLayer(
                cfLatestDataRowFromClientSideTable['clientSideUniqRowId'],
                'name - edit'
              )
            "
            class="el-icon-edit"
          />
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
        </el-button-group>
        <el-button
          :type="mfTypeOfButton('firstName')"
          plain
          :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1"
          >{{ cfLatestDataRowFromClientSideTable['firstName'] }}</el-button
        >
        <el-button :type="mfTypeOfButton('middleName')" plain>{{
          cfLatestDataRowFromClientSideTable['middleName']
        }}</el-button>
        <el-button :type="mfTypeOfButton('lastName')" plain>{{
          cfLatestDataRowFromClientSideTable['lastName']
        }}</el-button>
      </div>
    </showContentInCardComponent>
  </div>
</template>

<script>
/* Option1:

import mxTable from '@/components/ptinfo-single/1time-1row-mField/com-mx/mixins/view-layer.js'

Desired. Once this works then name, height, weight can share the same mixin-view-layer.js
But inside /com-mx/mixins/view-layer.js I am not able to import the correct
import mxFullSyncWithDbServer from './db/full-sync-with-db-server-mixin'

Since relative paths current working directory is /com-mx/

Posted the question on
stackoverflow: https://stackoverflow.com/questions/63373084/relative-path-getting-resolved-from-location-of-imported-file
Discord: https://discord.com/channels/325477692906536972/325479107012067328/743027109659672616

*/

/* option 2:
const mxTable = require('../code-common-for-all-1r-mf/view-layer.js').default         -> Works
Why use this?
Require allows to pass variable names Ref: https://stackoverflow.com/questions/13151693/passing-arguments-to-require-when-loading-module
Problem:
const mxTable = require('../code-common-for-all-1r-mf/view-layer.js')('weight').default -> Does not work
*/

/* Option3: Working. But in this option the same file '../code-common-for-all-1r-mf/view-layer.js' has to be kept in each folder like height weight name */
import mxViewLayer from '../code-common-for-all-1r-mf/view-layer.js'
import showContentInCardComponent from '@/components/ptinfo-single/common/show-content-in-card-component.vue'

export default {
  components: { showContentInCardComponent },
  mixins: [mxViewLayer],
  computed: {
    cfArOfNameForDisplay() {
      let arOfObjectsFromClientSideDB = new Array()
      let obj = new Object()
      obj['cardContentOfTypeStringToShowInBodyOfCards'] =
        this.cfLatestDataRowFromClientSideTable['firstName'] +
        ' - ' +
        this.cfLatestDataRowFromClientSideTable['middleName'] +
        ' - ' +
        this.cfLatestDataRowFromClientSideTable['lastName']

      obj['clientSideUniqRowId'] = this.cfLatestDataRowFromClientSideTable['clientSideUniqRowId']
      arOfObjectsFromClientSideDB.push(obj)
      return arOfObjectsFromClientSideDB
    },
  },
}
</script>
