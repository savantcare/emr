<template> <div></div> </template>
<script>
import ormSearchPhrasesOfCt from '@/cts/core/vl-search/orm-search-phrases-of-ct'
export default {
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Chapter 3',
        ctAbbr: 'bp',
        ctToShowInCsOfVl: 'spi/c3-hello-world/vl/table.vue', // CsVl -> Current state view layer
        layer: 'view',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Chapter 3 - change',
        ctAbbr: 'crem',
        ctToShowInCL: 'spi/c3-hello-world/cl/table.vue',
        layer: 'change',
        ctWidth: 'small',
      },
    })
  },
}
</script>
