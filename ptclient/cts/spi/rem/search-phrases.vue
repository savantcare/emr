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
        ctToShowInCsOfVl: 'spi/rem/vl/timeline.vue', // CsVl -> Current state view layer
        layer: 'view',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'add reminder',
        ctAbbr: 'arem',
        ctToShowInCL: 'spi/rem/cl/add.vue',
        layer: 'change',
        ctWidth: 'small',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'change reminder',
        ctAbbr: 'crem',
        ctToShowInCL: 'spi/rem/cl/c.vue',
        layer: 'change',
        ctWidth: 'small',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'multi change reminders',
        ctAbbr: 'mcrem',
        ctToShowInCL: 'spi/rem/cl/mc.vue',
        layer: 'change',
        ctWidth: 'large',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'discontinued reminders',
        ctAbbr: 'drem',
        ctToShowInCL: 'spi/rem/vl/discontinued.vue',
        layer: 'change',
        ctWidth: 'large',
      },
    })
  },
}
</script>
