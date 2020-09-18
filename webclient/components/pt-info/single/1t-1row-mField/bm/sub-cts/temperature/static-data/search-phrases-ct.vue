<template>
  <div></div>
</template>

<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side-db/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'temperature',
        ctAbbr: 'w',
        ctToShow: 'pt-info/single/1t-1row-mField/bm/sub-cts/temperature/vl/table-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'temperature - change',
        ctAbbr: 'wc',
        ctToShow: 'pt-info/single/1t-1row-mField/bm/sub-cts/temperature/cl/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
