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
        value: 'phq9',
        ctAbbr: 'h',
        ctToShow: 'pt-info/single/1time-1row-mField/phq9/view-layer/table-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'phq9 - edit',
        ctAbbr: 'hc',
        ctToShow: 'pt-info/single/1time-1row-mField/phq9/edit-layer/edit-design-1.vue', // El -> Edit layer
        displayLocation: 'edit-layer',
        needsRowIdToWork: 'no',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
