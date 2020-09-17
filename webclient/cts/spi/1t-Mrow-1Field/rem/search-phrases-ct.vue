<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
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
        value: 'reminders',
        ctAbbr: 'rem',
        ctToShow: 'spi/1t-Mrow-1Field/rem/vl/timeline-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'add reminder',
        ctAbbr: 'arem',
        ctToShow: 'spi/1t-Mrow-1Field/rem/cl/add-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'change reminder',
        ctAbbr: 'crem',
        ctToShow: 'spi/1t-Mrow-1Field/rem/cl/c-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'multi change reminders',
        ctAbbr: 'mcrem',
        ctToShow: 'spi/1t-Mrow-1Field/rem/cl/mc-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'discontinued reminders',
        ctAbbr: 'drem',
        ctToShow: 'spi/1t-Mrow-1Field/rem/vl/discontinued.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
