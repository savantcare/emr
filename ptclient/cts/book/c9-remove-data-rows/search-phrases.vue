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
        value: 'Ninth chapter',
        ctAbbr: 'c9',
        ctToShow: 'book/c9-remove-data-rows/vl/table.vue', // CsVl -> Current state view layer
        location: 'ptsvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Ninth chapter - change',
        ctAbbr: 'c9-c',
        ctToShow: 'book/c9-remove-data-rows/cl/table.vue',
        location: 'cl',
        ctWidth: 'small',
      },
    })
  },
}
</script>
