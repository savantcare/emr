<template>
  <div></div>
</template>

<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'height',
        ctAbbr: 'h',
        ctToShow: 'pt-info/single/1t-1row-mField/bm/sub-cts/height/view-layer/line-graph-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'height - change',
        ctAbbr: 'hc',
        ctToShow: 'pt-info/single/1t-1row-mField/bm/sub-cts/height/change-layer/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
