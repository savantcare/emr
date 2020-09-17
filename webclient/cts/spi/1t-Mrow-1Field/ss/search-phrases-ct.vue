<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
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
        value: 'service statements',
        ctAbbr: 'rem',
        ctToShow: 'spi/1t-Mrow-1Field/ss/vl/timeline-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'add service statement',
        ctAbbr: 'arem',
        ctToShow: 'spi/1t-Mrow-1Field/ss/cl/add-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'change service statement',
        ctAbbr: 'crem',
        ctToShow: 'spi/1t-Mrow-1Field/ss/cl/c-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'multi change service statements',
        ctAbbr: 'mcrem',
        ctToShow: 'spi/1t-Mrow-1Field/ss/cl/mc-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'discontinued service statements',
        ctAbbr: 'drem',
        ctToShow: 'spi/1t-Mrow-1Field/ss/vl/discontinued.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
