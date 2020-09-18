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
        value: 'date of birth',
        ctAbbr: 'w',
        ctToShow: 'pt-info/single/1t-1row-mField/date-of-birth/vl/table-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'date of birth - change',
        ctAbbr: 'wc',
        ctToShow: 'pt-info/single/1t-1row-mField/date-of-birth/cl/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
