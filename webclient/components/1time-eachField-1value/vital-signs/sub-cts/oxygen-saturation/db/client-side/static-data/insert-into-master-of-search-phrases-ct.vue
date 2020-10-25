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
        value: 'oxygen Saturation',
        ctAbbr: 'w',
        ctToShow: '1time-eachField-1value/vital-signs/sub-cts/oxygen-saturation/view-layer/line-graph-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'oxygen Saturation - edit',
        ctAbbr: 'wc',
        ctToShow: '1time-eachField-1value/vital-signs/sub-cts/oxygen-saturation/edit-layer/edit-design-1.vue', // El -> Edit layer
        displayLocation: 'edit-layer',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
