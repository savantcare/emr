<template>
  <div></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'date of birth',
        ctAbbr: 'w',
        ctToShow: 'pt-info/single/1time-1row-mField/date-of-birth/view-layer/dob-table-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'date of birth - change',
        ctAbbr: 'wc',
        ctToShow: 'pt-info/single/1time-1row-mField/date-of-birth/edit-layer/edit-design-1.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
