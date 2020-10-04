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
        value: 'map',
        ctAbbr: 'mp',
        ctToShow: 'ptinfo-combined/map/invoke.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
  },
}
</script>
