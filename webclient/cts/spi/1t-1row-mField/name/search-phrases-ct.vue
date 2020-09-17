<!-- Reference implementation for non numeric hence no graph -->

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
        value: 'name',
        ctAbbr: 'n',
        ctToShow: 'spi/1t-1row-mField/name/vl/full-name-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'name - change',
        ctAbbr: 'nc',
        ctToShow: 'spi/1t-1row-mField/name/cl/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
