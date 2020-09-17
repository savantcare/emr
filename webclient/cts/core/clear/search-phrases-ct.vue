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
        value: 'clear',
        ctAbbr: 'clr',
        ctToShow: 'core/clear/index.vue',
        displayLocation: 'ptsVl',
      },
    })
  },
}
</script>
