<template> <div></div> </template>
<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-ptsvl-cards/orm-search-phrases-of-ct'
export default {
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Third chapter',
        ctAbbr: 'c3',
        ctToShow: 'book/c03-click-to-invoke/vl/table.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Third chapter - change',
        ctAbbr: 'c3-c',
        ctToShow: 'book/c03-click-to-invoke/cl/table.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
  },
}
</script>
