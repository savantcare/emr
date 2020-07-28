<template> <div></div> </template>
<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-csvl-cards/orm-search-phrases-of-ct'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Fourth chapter',
        ctAbbr: 'c4',
        ctToShow: 'spi/c4-hello-world/vl/table.vue', // CsVl -> Current state view layer
        layer: 'view',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Fourth chapter - change',
        ctAbbr: 'c4-c',
        ctToShow: 'spi/c4-hello-world/cl/table.vue',
        layer: 'change',
        ctWidth: 'small',
      },
    })
  },
}
</script>
