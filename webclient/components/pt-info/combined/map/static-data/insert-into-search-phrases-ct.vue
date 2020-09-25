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
        value: 'map',
        ctAbbr: 'mp',
        ctToShow: 'pt-info/combined/map/invoke.vue',
        displayLocation: 'ptsVl',
      },
    })
  },
}
</script>
