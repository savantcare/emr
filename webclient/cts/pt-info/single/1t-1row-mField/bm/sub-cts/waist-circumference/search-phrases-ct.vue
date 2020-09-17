<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/search-phrases/search-phrases-of-components-orm'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'waist circumference',
        ctAbbr: 'wc',
        ctToShow: 'spi/1t-1row-mField/bm/sub-cts/waist-circumference/vl/line-graph-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'waist circumference - change',
        ctAbbr: 'wcc',
        ctToShow: 'spi/1t-1row-mField/bm/sub-cts/waist-circumference/cl/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
