<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/components/core/search-phrases/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'height',
        ctAbbr: 'h',
        ctToShow: 'pt-info/single/1t-1row-mField/bm/sub-cts/height/vl/line-graph-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'height - change',
        ctAbbr: 'hc',
        ctToShow: 'pt-info/single/1t-1row-mField/bm/sub-cts/height/cl/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
