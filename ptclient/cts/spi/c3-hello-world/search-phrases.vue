<template> <div></div> </template>
<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-csvl-cards/orm-search-phrases-of-ct'
export default {
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Third chapter',
        ctAbbr: 'c3',
        ctToShow: 'spi/c3-hello-world/vl/table.vue', // CsVl -> Current state view layer
        layer: 'view',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Third chapter - change',
        ctAbbr: 'c3-c',
        ctToShow: 'spi/c3-hello-world/cl/table.vue',
        layer: 'change',
        ctWidth: 'small',
      },
    })
  },
}
</script>
