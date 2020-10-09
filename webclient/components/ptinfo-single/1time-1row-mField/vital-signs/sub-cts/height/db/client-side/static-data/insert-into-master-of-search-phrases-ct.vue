<template>
  <div></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'height',
        ctAbbr: 'h',
        ctToShow:
          'ptinfo-single/1time-1row-mField/vital-signs/sub-cts/height/view-layer/line-graph-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'height - edit',
        ctAbbr: 'hc',
        ctToShow:
          'ptinfo-single/1time-1row-mField/vital-signs/sub-cts/height/edit-layer/edit-design-1.vue', // El -> Edit layer
        displayLocation: 'edit-layer',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
