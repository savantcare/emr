<!-- The search phrases are a entry point to load different cts. -->
<template> <div></div> </template>
<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-csvl-cards/orm-search-phrases-of-ct'
export default {
  mounted() {
    ormSearchPhrasesOfCt.insert({
      // ormSearchPhrasesOfCt lives in vue/state and allows sql queries. Uses vuex-orm
      data: {
        value: 'Chapter 1',
        ctAbbr: 'c1',
        ctToShowInCsOfVl: 'spi/c1-hello-world/vl/table.vue', // CsVl -> Current state view layer. Read docs/glossary.md when you dont understand a abbreviation.
        layer: 'view', // used by cts/core/manage-csvl-cards/load-search-phrases-and-handle-selection.vue to decide if this ct should be loaded in csvl or cl
      },
    })
  },
}
</script>
