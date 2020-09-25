<template>
  <div></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
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
