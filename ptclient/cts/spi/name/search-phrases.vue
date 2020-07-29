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
        ctToShow: 'spi/name/vl/table.vue', // CsVl -> Current state view layer
        location: 'ptsvl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'name change',
        ctAbbr: 'nc',
        ctToShow: 'spi/name/cl/table.vue', // CsVl -> Current state view layer
        location: 'cl',
      },
    })
  },
}
</script>
