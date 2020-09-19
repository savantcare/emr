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
        value: 'blood pressure',
        ctAbbr: 'bp',
        ctToShow:
          'pt-info/single/1time-1row-mField/bm/sub-cts/blood-pressure/view-layer/line-graph-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'blood pressure - change',
        ctAbbr: 'bpc',
        ctToShow:
          'pt-info/single/1time-1row-mField/bm/sub-cts/blood-pressure/change-layer/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
