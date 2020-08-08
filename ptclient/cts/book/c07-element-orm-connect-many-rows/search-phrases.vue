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
        value: 'Seventh chapter',
        ctAbbr: 'c7',
        ctToShow: 'book/c07-element-orm-connect-many-rows/vl/table.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Seventh chapter - change',
        ctAbbr: 'c7-c',
        ctToShow: 'book/c07-element-orm-connect-many-rows/cl/table.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
  },
}
</script>
