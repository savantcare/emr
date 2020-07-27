<template> <div></div> </template>
<script>
import ormSearchPhrasesOfCt from '@/cts/core/vl-search/orm-search-phrases-of-ct'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Hello world Chapter 4',
        ctAbbr: 'bp',
        ctToShowInCsOfVl: 'spi/c4-hello-world/vl/table.vue', // CsVl -> Current state view layer
        layer: 'view',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'hello world Chapter 4 - change',
        ctAbbr: 'crem',
        ctToShowInCL: 'spi/c4-hello-world/cl/table.vue',
        layer: 'change',
        ctWidth: 'small',
      },
    })
  },
}
</script>
