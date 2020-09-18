<template>
  <div></div>
</template>

<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/vuex-orm/search-phrases-of-components-table'

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
          'pt-info/single/1t-1row-mField/bm/sub-cts/waist-circumference/vl/line-graph-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'waist circumference - change',
        ctAbbr: 'wcc',
        ctToShow: 'pt-info/single/1t-1row-mField/bm/sub-cts/waist-circumference/cl/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
