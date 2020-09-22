<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div><tblMasterListOfSSCt /></div>
</template>

<script>
import clientSideTblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'
import tblMasterListOfSSCt from './master-list-of-mse-ct'

export default {
  components: { tblMasterListOfSSCt },
  data() {
    return {}
  },
  mounted() {
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'mental status exams',
        ctAbbr: 'ss',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/mental-status-exam/view-layer/table-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'add mental status exam',
        ctAbbr: 'addss',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/mental-status-exam/change-layer/add-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'change mental status exam',
        ctAbbr: 'css',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/mental-status-exam/change-layer/c-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'discontinued mental status exams',
        ctAbbr: 'dss',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/mental-status-exam/view-layer/discontinued.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
