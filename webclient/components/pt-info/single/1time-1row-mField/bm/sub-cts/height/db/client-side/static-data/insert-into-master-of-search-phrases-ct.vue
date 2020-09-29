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
        value: 'height',
        ctAbbr: 'h',
        ctToShow: 'pt-info/single/1time-1row-mField/bm/sub-cts/height/view-layer/line-graph-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'height - edit',
        ctAbbr: 'hc',
        ctToShow: 'pt-info/single/1time-1row-mField/bm/sub-cts/height/edit-layer/edit-design-1.vue', // Cl -> Change layer
        displayLocation: 'edit-layer',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
