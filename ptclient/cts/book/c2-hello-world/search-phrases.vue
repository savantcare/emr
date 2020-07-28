<template> <div></div> </template>
<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-csvl-cards/orm-search-phrases-of-ct'
export default {
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Second chapter', // search term
        ctAbbr: 'c2',
        ctToShow: 'book/c2-hello-world/vl/table.vue', // CsVl -> Current state view layer
        location: 'csvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Second chapter - change', // search term
        ctAbbr: 'c2-c',
        ctToShow: 'book/c2-hello-world/cl/table.vue',
        location: 'cl',
        ctWidth: 'small',
      },
    })
  },
}
</script>
