<template>
  <div></div>
</template>

<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'phq9',
        ctAbbr: 'h',
        ctToShow: 'pt-info/single/1t-1row-mField/phq9/view-layer/table-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'phq9 - change',
        ctAbbr: 'hc',
        ctToShow: 'pt-info/single/1t-1row-mField/phq9/change-layer/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
