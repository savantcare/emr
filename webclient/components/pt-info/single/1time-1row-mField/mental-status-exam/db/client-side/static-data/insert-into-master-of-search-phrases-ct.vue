<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/call-insert-search-phases-of-components-and-handle-selection.vue.vue -->
<template>
  <div><insertIntoMasterRowsOfMentalStatusExamCt /></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'
import insertIntoMasterRowsOfMentalStatusExamCt from './insert-into-master-of-mental-status-exam-ct.vue'

export default {
  components: { insertIntoMasterRowsOfMentalStatusExamCt },
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'mental status exam',
        ctAbbr: 'mse',
        ctToShow:
          'pt-info/single/1time-1row-mField/mental-status-exam/view-layer/category-name-concatenated-using-cards-ct', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'mental status exam v2',
        ctAbbr: 'mse',
        ctToShow:
          'pt-info/single/1time-1row-mField/mental-status-exam/view-layer/category-name-grouped-ct', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit mental status exam',
        ctAbbr: 'cmse',
        ctToShow:
          'pt-info/single/1time-1row-mField/mental-status-exam/edit-layer/edit-design-1.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
  },
}
</script>
