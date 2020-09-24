<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div><tblMasterListOfSSCt /></div>
</template>

<script>
import clientSideTblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'
import tblMasterListOfSSCt from './master-list-of-mental-status-exam-ct'

export default {
  components: { tblMasterListOfSSCt },
  data() {
    return {}
  },
  mounted() {
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'mental status exam',
        ctAbbr: 'mse',
        ctToShow:
          'pt-info/single/1time-1row-mField/mental-status-exam/view-layer/category-name-concatenated-using-cards-ct', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'mental status exam v2',
        ctAbbr: 'mse',
        ctToShow:
          'pt-info/single/1time-1row-mField/mental-status-exam/view-layer/category-name-grouped-ct', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
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
