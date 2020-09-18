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
        value: 'date of birth',
        ctAbbr: 'w',
        ctToShow: 'pt-info/single/1t-1row-mField/date-of-birth/view-layer/table-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'date of birth - change',
        ctAbbr: 'wc',
        ctToShow: 'pt-info/single/1t-1row-mField/date-of-birth/change-layer/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
