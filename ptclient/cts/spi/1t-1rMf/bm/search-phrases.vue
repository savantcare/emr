<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-ptsvl-cards/orm-search-phrases-of-ct'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'body measurement',
        ctAbbr: 'bm',
        ctToShow: 'spi/1t-1rMf/bm/vl/table.vue', // CsVl -> Current state view layer
        displayLocation: 'ptsvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'body measurement - change',
        ctAbbr: 'bmcc',
        ctToShow: 'spi/1t-1rMf/bm/cl/c.vue', // Cl -> Change layer
        displayLocation: 'cl',
        operatesOn: 'row',
      },
    })
  },
}
</script>
