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
        value: 'blood pressure',
        ctAbbr: 'bp',
        ctToShow:
          'pt-info/single/1time-1row-mField/bm/sub-cts/blood-pressure/view-layer/line-graph-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'edit blood pressure',
        ctAbbr: 'bpc',
        ctToShow:
          'pt-info/single/1time-1row-mField/bm/sub-cts/blood-pressure/edit-layer/edit-design-1.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
