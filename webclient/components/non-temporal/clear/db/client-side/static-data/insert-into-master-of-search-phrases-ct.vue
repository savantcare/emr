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
        value: 'clear',
        ctAbbr: 'clr',
        ctToShow: 'non-temporal/clear/index.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
  },
}
</script>
