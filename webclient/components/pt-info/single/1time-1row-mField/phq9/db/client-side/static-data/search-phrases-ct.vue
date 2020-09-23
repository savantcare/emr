<!-- To understand how this works read components/core/search-phrases/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'phq9',
        ctAbbr: 'h',
        ctToShow: 'pt-info/single/1time-1row-mField/phq9/view-layer/line-graph-ct.vue',
        displayLocation: 'ptsVl',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'phq9 - change',
        ctAbbr: 'hc',
        ctToShow: 'pt-info/single/1time-1row-mField/phq9/change-layer/c-ct.vue',
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
