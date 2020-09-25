<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div><tblMasterRowsOfServiceStatementCt /></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'
import tblMasterRowsOfServiceStatementCt from './insert-into-master-of-service-statement-ct.vue'

export default {
  components: { tblMasterRowsOfServiceStatementCt },
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'service statements',
        ctAbbr: 'ss',
        ctToShow:
          'pt-info/single/1time-Mrow-1Field/service-statement/view-layer/grid-with-cards-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit service statement',
        ctAbbr: 'css',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/service-statement/edit-layer/edit-design-1.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted service statements',
        ctAbbr: 'dss',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/service-statement/view-layer/deleted.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
