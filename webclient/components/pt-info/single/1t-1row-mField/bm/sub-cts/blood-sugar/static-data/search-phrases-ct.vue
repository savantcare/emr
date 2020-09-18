<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/components/core/search-phrases/search-phrases-of-components-orm'

export default {
  data() {
    return {}
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'blood Sugar',
        ctAbbr: 'bs',
        ctToShow: 'pt-info/single/1t-1row-mField/bm/sub-cts/blood-sugar/vl/line-graph-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'blood Sugar - change',
        ctAbbr: 'bsc',
        ctToShow: 'pt-info/single/1t-1row-mField/bm/sub-cts/blood-sugar/cl/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
