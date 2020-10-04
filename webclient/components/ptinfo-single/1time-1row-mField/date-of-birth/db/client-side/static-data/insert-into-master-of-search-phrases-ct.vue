<template>
  <div></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'date of birth',
        ctAbbr: 'w',
        ctToShow: 'ptinfo-single/1time-1row-mField/date-of-birth/view-layer/dob-table-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'date of birth - edit',
        ctAbbr: 'wc',
        ctToShow: 'ptinfo-single/1time-1row-mField/date-of-birth/edit-layer/edit-design-1.vue', // El -> Edit layer
        displayLocation: 'edit-layer',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
