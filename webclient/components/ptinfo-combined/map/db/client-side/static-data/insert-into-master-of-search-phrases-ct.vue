<template>
  <div></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'map',
        ctAbbr: 'mp',
        ctToShow: 'ptinfo-combined/map/invoke.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
  },
}
</script>
