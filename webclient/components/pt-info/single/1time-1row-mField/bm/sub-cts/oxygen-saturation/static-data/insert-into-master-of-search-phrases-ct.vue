<template>
  <div></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'oxygen Saturation',
        ctAbbr: 'w',
        ctToShow:
          'pt-info/single/1time-1row-mField/bm/sub-cts/oxygen-saturation/view-layer/line-graph-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'oxygen Saturation - change',
        ctAbbr: 'wc',
        ctToShow:
          'pt-info/single/1time-1row-mField/bm/sub-cts/oxygen-saturation/edit-layer/edit-design-1.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
