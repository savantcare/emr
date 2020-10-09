<!-- Reference implementation for non numeric hence no graph-->
<template>
  <div>
    <showContentInCardComponent
      propMainCardName="Contacts"
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
        jai kali ma
      </div>
    </showContentInCardComponent>
  </div>
</template>

<script>
/* Option1:

import mxTable from '@/components/1time-1row-mField/com-mx/mixins/view-layer.js'

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
import showContentInCardComponent from '@/components/non-temporal/display-manager/show-content-in-card-component.vue'

export default {
  components: { showContentInCardComponent },
  computed: {
    cfArOfNameForDisplay() {},
  },
  methods: {
    mfEditIconClicked(pRowId) {},
  },
}
</script>
