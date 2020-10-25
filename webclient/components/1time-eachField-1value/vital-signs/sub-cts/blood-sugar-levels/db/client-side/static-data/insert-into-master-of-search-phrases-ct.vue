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
        value: 'blood Sugar',
        ctAbbr: 'bs',
        ctToShow: '1time-eachField-1value/vital-signs/sub-cts/blood-sugar-levels/view-layer/line-graph-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'blood Sugar - edit',
        ctAbbr: 'bsc',
        ctToShow: '1time-eachField-1value/vital-signs/sub-cts/blood-sugar-levels/edit-layer/edit-design-1.vue', // El -> Edit layer
        displayLocation: 'edit-layer',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
