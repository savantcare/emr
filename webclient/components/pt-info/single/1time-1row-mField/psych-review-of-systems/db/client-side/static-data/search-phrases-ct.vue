<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div><tblMasterListOfSSCt /></div>
</template>

<script>
import clientSideTblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'
import tblMasterListOfSSCt from './master-list-of-psych-review-of-systems-ct'

export default {
  components: { tblMasterListOfSSCt },
  data() {
    return {}
  },
  mounted() {
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'psych review of systems',
        ctAbbr: 'ss',
        ctToShow:
          'pt-info/single/1time-1row-mField/psych-review-of-systems/view-layer/table-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'edit psych review of systems',
        ctAbbr: 'css',
        ctToShow: 'pt-info/single/1time-1row-mField/psych-review-of-systems/edit-layer/c-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
  },
}
</script>
