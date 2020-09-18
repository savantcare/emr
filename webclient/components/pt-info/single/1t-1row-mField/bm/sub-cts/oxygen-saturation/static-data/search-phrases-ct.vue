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
        value: 'oxygen Saturation',
        ctAbbr: 'w',
        ctToShow: 'pt-info/single/1t-1row-mField/bm/sub-cts/oxygen-saturation/vl/line-graph-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'oxygen Saturation - change',
        ctAbbr: 'wc',
        ctToShow: 'pt-info/single/1t-1row-mField/bm/sub-cts/oxygen-saturation/cl/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
