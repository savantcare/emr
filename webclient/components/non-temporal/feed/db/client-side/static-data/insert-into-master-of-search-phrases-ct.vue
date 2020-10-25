<template>
  <div></div>
</template>

<script>
import clientTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'feed',
        ctAbbr: 'fd',
        ctToShow: 'non-temporal/feed/invoke.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
  },
}
</script>
