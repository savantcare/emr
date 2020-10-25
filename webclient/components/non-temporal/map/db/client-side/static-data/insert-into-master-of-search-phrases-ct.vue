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
        value: 'map',
        ctAbbr: 'mp',
        ctToShow: 'non-temporal/map/invoke.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
  },
}
</script>
