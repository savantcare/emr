<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/search-phrases/orm-search-phrases-of-ct'

export default {
  data() {
    return {
      // dataTable: [],
    }
  },
  mounted() {
    // Search interfaces to this component
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'add diagnosis',
        ctAbbr: 'adddx',
        ctToShow: 'spi/dx/cl/ctAddDx.vue',
        displayLocation: 'cl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'diagnosis',
        ctAbbr: 'dx',
        ctToShow: 'spi/dx/dx-vl.vue',
        displayLocation: 'ptsVl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'multichange dx assessment',
        ctAbbr: 'mcdxa',
        ctToShow: 'spi/dx/cl/ctMultiChangeDxa.vue',
        displayLocation: 'cl',
      },
    })
  },
}
</script>
