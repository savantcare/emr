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
        value: 'phq9',
        ctAbbr: 'h',
        ctToShow: 'pt-info/single/1time-1row-mField/phq9/view-layer/table-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'phq9 - change',
        ctAbbr: 'hc',
        ctToShow: 'pt-info/single/1time-1row-mField/phq9/edit-layer/edit-design-1.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
