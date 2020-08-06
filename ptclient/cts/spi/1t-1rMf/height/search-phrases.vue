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
        value: 'height',
        ctAbbr: 'h',
        ctToShow: 'spi/1t-1rMf/height/vl/graph.vue', // CsVl -> Current state view layer. When I give height command show me a graph.
        displayLocation: 'ptsvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'height - change',
        ctAbbr: 'hc',
        ctToShow: 'spi/1t-1rMf/height/cl/c.vue', // Cl -> Change layer
        displayLocation: 'cl',
        operatesOn: 'row',
      },
    })
  },
}
</script>
