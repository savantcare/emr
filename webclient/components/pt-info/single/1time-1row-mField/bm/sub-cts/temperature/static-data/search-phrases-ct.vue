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
        value: 'temperature',
        ctAbbr: 'w',
        ctToShow: 'pt-info/single/1time-1row-mField/bm/sub-cts/temperature/view-layer/table-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'edit temperature',
        ctAbbr: 'wc',
        ctToShow:
          'pt-info/single/1time-1row-mField/bm/sub-cts/temperature/edit-layer/edit-design-1.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
