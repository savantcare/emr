<!-- To understand how this works read manage-csvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-csvl-cards/orm-search-phrases-of-ct'

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
        location: 'csvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'add reminder',
        ctAbbr: 'arem',
        ctToShow: 'spi/rem/cl/add.vue',
        location: 'cl',
        ctWidth: 'small',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'change reminder',
        ctAbbr: 'crem',
        ctToShow: 'spi/rem/cl/c.vue',
        location: 'cl',
        ctWidth: 'small',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'multi change reminders',
        ctAbbr: 'mcrem',
        ctToShow: 'spi/rem/cl/mc.vue',
        location: 'cl',
        ctWidth: 'large',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'discontinued reminders',
        ctAbbr: 'drem',
        ctToShow: 'spi/rem/vl/discontinued.vue',
        location: 'cl',
        ctWidth: 'large',
      },
    })
  },
}
</script>
