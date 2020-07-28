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
        value: 'Fifth chapter',
        ctAbbr: 'c5',
        ctToShow: 'spi/c5-hello-world/vl/table.vue', // CsVl -> Current state view layer
        location: 'csvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Fifth chapter - change',
        ctAbbr: 'c5-c',
        ctToShow: 'spi/c5-hello-world/cl/table.vue',
        location: 'cl',
        ctWidth: 'small',
      },
    })
  },
}
</script>
