<template>
  <div></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'blood Sugar',
        ctAbbr: 'bs',
        ctToShow:
          'ptinfo-single/1time-1row-mField/vital-signs/sub-cts/blood-sugar-levels/view-layer/line-graph-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'blood Sugar - edit',
        ctAbbr: 'bsc',
        ctToShow:
          'ptinfo-single/1time-1row-mField/vital-signs/sub-cts/blood-sugar-levels/edit-layer/edit-design-1.vue', // El -> Edit layer
        displayLocation: 'edit-layer',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
