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
        value: 'blood pressure',
        ctAbbr: 'bp',
        ctToShow: 'spi/1t-1row-mField/bm/sub-cts/blood-pressure/vl/line-graph-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'blood pressure - change',
        ctAbbr: 'bpc',
        ctToShow: 'spi/1t-1row-mField/bm/sub-cts/blood-pressure/cl/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
