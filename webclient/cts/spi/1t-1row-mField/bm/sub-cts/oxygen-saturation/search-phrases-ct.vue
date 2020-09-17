<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-ptsvl-cards/orm-search-phrases-of-ct'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'oxygen Saturation',
        ctAbbr: 'w',
        ctToShow: 'spi/1t-1row-mField/bm/sub-cts/oxygen-saturation/vl/line-graph-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'oxygen Saturation - change',
        ctAbbr: 'wc',
        ctToShow: 'spi/1t-1row-mField/bm/sub-cts/oxygen-saturation/cl/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
