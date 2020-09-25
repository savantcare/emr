<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div><tblMasterRowsOfPsychReviewOfSystemsCt /></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'
import tblMasterRowsOfPsychReviewOfSystemsCt from './insert-into-master-of-psych-review-of-systems-ct.vue'

export default {
  components: { tblMasterRowsOfPsychReviewOfSystemsCt },
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'psych review of systems',
        ctAbbr: 'ss',
        ctToShow:
          'pt-info/single/1time-1row-mField/psych-review-of-systems/view-layer/table-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit psych review of systems',
        ctAbbr: 'css',
        ctToShow:
          'pt-info/single/1time-1row-mField/psych-review-of-systems/edit-layer/edit-design-1.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
  },
}
</script>
