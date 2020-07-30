<template> <div></div> </template>
<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-ptsvl-cards/orm-search-phrases-of-ct'
export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Fourth chapter',
        ctAbbr: 'c4',
        ctToShow: 'book/c04-orm-model/vl/table.vue', // CsVl -> Current state view layer
        displayLocation: 'ptsvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Fourth chapter - change',
        ctAbbr: 'c4-c',
        ctToShow: 'book/c04-orm-model/cl/table.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
  },
}
</script>
