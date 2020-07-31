<template>
  <div></div>
</template>
<script>
// ORM model ref : /book/c01-hello-world-tj/search-phrases.vue:7
import ormSearchPhrasesOfCt from '@/cts/core/manage-ptsvl-cards/orm-search-phrases-of-ct'
export default {
  mounted() {
    // mounted function basic ref : /book/c01-hello-world-tj/search-phrases.vue:22
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Third chapter',
        ctAbbr: 'c3',
        ctToShow: 'book/c03-click-to-invoke-tj/vl/table.vue', // CsVl -> Current state view layer
        displayLocation: 'ptsvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Third chapter - change',
        ctAbbr: 'c3-c',
        ctToShow: 'book/c03-click-to-invoke-tj/cl/table.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
  },
}
</script>
