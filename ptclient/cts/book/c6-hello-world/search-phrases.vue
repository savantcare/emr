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
        value: 'Sixth chapter',
        ctAbbr: 'c6',
        ctToShow: 'book/c6-hello-world/vl/table.vue', // CsVl -> Current state view layer
        location: 'csvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Sixth chapter - change',
        ctAbbr: 'c6-c',
        ctToShow: 'book/c6-hello-world/cl/table.vue',
        location: 'cl',
        ctWidth: 'small',
      },
    })
  },
}
</script>
