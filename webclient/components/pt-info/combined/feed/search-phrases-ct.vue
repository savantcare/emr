<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/components/core/search-phrases/search-phrases-of-components-orm'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'feed',
        ctAbbr: 'fd',
        ctToShow: 'pt-info/combined/feed/invoke.vue',
        displayLocation: 'ptsVl',
      },
    })
  },
}
</script>
