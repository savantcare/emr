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
        value: 'phq9',
        ctAbbr: 'h',
        ctToShow: 'spi/1t-1row-mField/phq9/vl/line-graph-ct.vue', // table-ct.vue
        displayLocation: 'ptsVl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'phq9 - change',
        ctAbbr: 'hc',
        ctToShow: 'spi/1t-1row-mField/phq9/cl/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
