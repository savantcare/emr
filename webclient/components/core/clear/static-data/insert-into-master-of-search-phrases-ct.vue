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
        value: 'clear',
        ctAbbr: 'clr',
        ctToShow: 'core/clear/index.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
  },
}
</script>
