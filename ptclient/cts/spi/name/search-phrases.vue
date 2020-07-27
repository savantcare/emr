<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-csvl-cards/orm-search-phrases-of-ct'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'name',
        ctAbbr: 'name',
        ctToShowInCsOfVl: 'spi/name/vl/table.vue', // CsVl -> Current state view layer
        layer: 'view',
      },
    })
  },
}
</script>
