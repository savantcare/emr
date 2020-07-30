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
        value: 'Eigth chapter',
        ctAbbr: 'c8',
        ctToShow: 'book/c8-reset-form/vl/table.vue', // CsVl -> Current state view layer
        location: 'ptsvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Eigth chapter - change',
        ctAbbr: 'c8-c',
        ctToShow: 'book/c8-reset-form/cl/table.vue',
        location: 'cl',
        ctWidthInCl: 'small',
      },
    })
  },
}
</script>
