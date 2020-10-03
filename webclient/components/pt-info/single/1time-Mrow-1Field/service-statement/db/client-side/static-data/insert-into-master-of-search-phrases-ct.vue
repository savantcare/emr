<!-- Reference implementation -->
<!-- To understand how this works call-insert-search-phases-of-components-and-handle-selection.vue -->
<template>
  <div><insertIntoMasterTblOfServiceStatementDuringInitOfCt /></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'
import insertIntoMasterTblOfServiceStatementDuringInitOfCt from './insert-into-master-of-service-statement-ct'

export default {
  components: { insertIntoMasterTblOfServiceStatementDuringInitOfCt },
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'service statements',
        ctAbbr: 'ss',
        ctToShow:
          'pt-info/single/1time-Mrow-1Field/service-statement/view-layer/ss-design-1-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit service statement',
        ctAbbr: 'css',
        ctToShow:
          'pt-info/single/1time-Mrow-1Field/service-statement/edit-layer/ss-edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted service statements',
        ctAbbr: 'dss',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/service-statement/view-layer/deleted.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
