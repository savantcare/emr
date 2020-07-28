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
        value: 'Tenth chapter',
        ctAbbr: 'c10',
        ctToShow: 'book/c10-new-data-in-vl/vl/table.vue', // CsVl -> Current state view layer
        location: 'csvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Tenth chapter - change',
        ctAbbr: 'c10-c',
        ctToShow: 'book/c10-new-data-in-vl/cl/table.vue',
        location: 'cl',
        ctWidth: 'small',
      },
    })
  },
}
</script>
