<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/search-phrases/search-phrases-of-components-orm'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'feed',
        ctAbbr: 'fd',
        ctToShow: 'core/feed/invoke.vue',
        displayLocation: 'ptsVl',
      },
    })
  },
}
</script>
