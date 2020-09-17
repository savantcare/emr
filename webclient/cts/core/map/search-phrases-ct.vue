<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/search-phrases/orm-search-phrases-of-ct'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'map',
        ctAbbr: 'mp',
        ctToShow: 'core/map/invoke.vue',
        displayLocation: 'ptsVl',
      },
    })
  },
}
</script>
