<template>
  <div></div>
</template>

<script>
import clientSideTblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblSearchPhrasesOfCt.insert({
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
