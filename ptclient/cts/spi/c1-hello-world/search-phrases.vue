<template> <div></div> </template>
<script>
import ormSearchPhrasesOfCt from '@/cts/core/vl-search/orm-search-phrases-of-ct'

export default {
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Hello world C1',
        ctAbbr: 'bp',
        ctToShowInCsOfVl: 'spi/c1-hello-world/vl/table.vue', // CSVL -> Current state view layer
        layer: 'view', // Used by
      },
    })
  },
}
</script>
