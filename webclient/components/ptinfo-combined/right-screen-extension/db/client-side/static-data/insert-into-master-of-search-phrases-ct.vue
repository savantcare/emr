<template>
  <div></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/others/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'feed',
        ctAbbr: 'fd',
        ctToShow: 'ptinfo-combined/right-screen-extension/invoke.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
  },
}
</script>
