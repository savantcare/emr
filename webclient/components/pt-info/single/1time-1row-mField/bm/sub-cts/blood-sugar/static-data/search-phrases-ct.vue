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
        value: 'blood Sugar',
        ctAbbr: 'bs',
        ctToShow:
          'pt-info/single/1time-1row-mField/bm/sub-cts/blood-sugar/view-layer/line-graph-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'blood Sugar - change',
        ctAbbr: 'bsc',
        ctToShow: 'pt-info/single/1time-1row-mField/bm/sub-cts/blood-sugar/change-layer/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
