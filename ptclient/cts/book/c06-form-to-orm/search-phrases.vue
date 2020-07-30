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
        value: 'Sixth chapter',
        ctAbbr: 'c6',
        ctToShow: 'book/c06-form-to-orm/vl/table.vue', // CsVl -> Current state view layer
        displayLocation: 'ptsvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Sixth chapter - change',
        ctAbbr: 'c6-c',
        ctToShow: 'book/c06-form-to-orm/cl/table.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
  },
}
</script>
