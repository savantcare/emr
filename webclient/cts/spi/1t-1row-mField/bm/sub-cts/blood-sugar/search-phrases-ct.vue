<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/search-phrases/orm-search-phrases-of-ct'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'blood Sugar',
        ctAbbr: 'bs',
        ctToShow: 'spi/1t-1row-mField/bm/sub-cts/blood-sugar/vl/line-graph-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'blood Sugar - change',
        ctAbbr: 'bsc',
        ctToShow: 'spi/1t-1row-mField/bm/sub-cts/blood-sugar/cl/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
