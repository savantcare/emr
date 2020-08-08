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
        value: 'Fifth chapter',
        ctAbbr: 'c5',
        ctToShow: 'book/c05-form-field/vl/table.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Fifth chapter - change',
        ctAbbr: 'c5-c',
        ctToShow: 'book/c05-form-field/cl/table.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
  },
}
</script>
