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
        value: 'name',
        ctAbbr: 'n',
        ctToShow: 'spi/1t-1rMf/name/vl/table.vue', // CsVl -> Current state view layer
        displayLocation: 'ptsvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'name - change',
        ctAbbr: 'nc',
        ctToShow: 'spi/1t-1rMf/name/cl/table.vue', // Cl -> Change layer
        displayLocation: 'cl',
      },
    })
  },
}
</script>
