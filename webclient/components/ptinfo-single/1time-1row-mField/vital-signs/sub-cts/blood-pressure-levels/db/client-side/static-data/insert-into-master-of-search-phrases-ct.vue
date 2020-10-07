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
        value: 'blood pressure',
        ctAbbr: 'bp',
        ctToShow:
          'ptinfo-single/1time-1row-mField/vital-signs/sub-cts/blood-pressure-levels/view-layer/line-graph-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'blood pressure - edit',
        ctAbbr: 'bpc',
        ctToShow:
          'ptinfo-single/1time-1row-mField/vital-signs/sub-cts/blood-pressure-levels/edit-layer/edit-design-1.vue', // El -> Edit layer
        displayLocation: 'edit-layer',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
