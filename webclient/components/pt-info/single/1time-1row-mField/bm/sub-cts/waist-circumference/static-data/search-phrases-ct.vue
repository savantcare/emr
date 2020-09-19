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
        value: 'waist circumference',
        ctAbbr: 'wc',
        ctToShow:
          'pt-info/single/1time-1row-mField/bm/sub-cts/waist-circumference/view-layer/line-graph-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'waist circumference - change',
        ctAbbr: 'wcc',
        ctToShow:
          'pt-info/single/1time-1row-mField/bm/sub-cts/waist-circumference/change-layer/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
