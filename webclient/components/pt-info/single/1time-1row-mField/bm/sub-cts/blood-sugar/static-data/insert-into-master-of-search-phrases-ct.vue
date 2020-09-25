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
          'pt-info/single/1time-1row-mField/bm/sub-cts/blood-sugar/view-layer/line-graph-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'blood Sugar - change',
        ctAbbr: 'bsc',
        ctToShow:
          'pt-info/single/1time-1row-mField/bm/sub-cts/blood-sugar/edit-layer/edit-design-1.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
