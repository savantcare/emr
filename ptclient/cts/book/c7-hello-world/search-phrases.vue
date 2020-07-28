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
        value: 'Hello world C3',
        ctAbbr: 'bp',
        ctToShow: 'book/c3-hello-world/vl/table.vue', // CsVl -> Current state view layer
        location: 'csvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'hello world C3 - change',
        ctAbbr: 'crem',
        ctToShow: 'book/c3-hello-world/cl/table.vue',
        location: 'cl',
        ctWidth: 'small',
      },
    })
  },
}
</script>
