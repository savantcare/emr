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
        value: 'phone numbers',
        ctAbbr: 'rem',
        ctToShow: 'spi/1t-MrMf/phone-numbers/vl/table-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'add phone number',
        ctAbbr: 'arem',
        ctToShow: 'spi/1t-MrMf/phone-numbers/cl/add-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'change phone number',
        ctAbbr: 'crem',
        ctToShow: 'spi/1t-MrMf/phone-numbers/cl/c-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'multi change phone numbers',
        ctAbbr: 'mcrem',
        ctToShow: 'spi/1t-MrMf/phone-numbers/cl/mc-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'discontinued phone numbers',
        ctAbbr: 'drem',
        ctToShow: 'spi/1t-MrMf/phone-numbers/vl/discontinued.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
