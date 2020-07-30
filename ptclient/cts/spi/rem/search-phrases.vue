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
        value: 'reminders',
        ctAbbr: 'rem',
        ctToShow: 'spi/rem/vl/timeline.vue', // CsVl -> Current state view layer
        displayLocation: 'ptsvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'add reminder',
        ctAbbr: 'arem',
        ctToShow: 'spi/rem/cl/add.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'change reminder',
        ctAbbr: 'crem',
        ctToShow: 'spi/rem/cl/c.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        scope: 'row',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'multi change reminders',
        ctAbbr: 'mcrem',
        ctToShow: 'spi/rem/cl/mc.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'discontinued reminders',
        ctAbbr: 'drem',
        ctToShow: 'spi/rem/vl/discontinued.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
