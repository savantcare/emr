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
        value: 'Seventh chapter',
        ctAbbr: 'c7',
        ctToShow: 'book/c7-multiple-data-rows/vl/table.vue', // CsVl -> Current state view layer
        location: 'csvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Seventh chapter - change',
        ctAbbr: 'c7-c',
        ctToShow: 'book/c7-multiple-data-rows/cl/table.vue',
        location: 'cl',
        ctWidth: 'small',
      },
    })
  },
}
</script>
