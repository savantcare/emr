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
        value: 'Second chapter', // search term
        ctAbbr: 'c2',
        ctToShow: 'book/c02-change-layer-tj/vl/table.vue', // CsVl -> Current state view layer
        displayLocation: 'ptsvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'Second chapter - change', // search term
        ctAbbr: 'c2-c',
        ctToShow: 'book/c02-change-layer-tj/cl/table.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
  },
}
</script>
