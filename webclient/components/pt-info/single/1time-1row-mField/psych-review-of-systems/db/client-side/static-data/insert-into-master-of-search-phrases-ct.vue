<!-- Reference implementation -->
<!-- To understand how this works call-insert-search-phases-of-components-and-handle-selection.vue -->
<template>
  <div><insertIntoMasterRowsOfPsychReviewOfSystemsCt /></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'
import insertIntoMasterRowsOfPsychReviewOfSystemsCt from './insert-into-master-of-psych-review-of-systems-ct.vue'

export default {
  components: { insertIntoMasterRowsOfPsychReviewOfSystemsCt },
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'psych review of systems',
        ctAbbr: 'ss',
        ctToShow:
          'pt-info/single/1time-1row-mField/psych-review-of-systems/view-layer/pros-design-1-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit psych review of systems',
        ctAbbr: 'css',
        ctToShow:
          'pt-info/single/1time-1row-mField/psych-review-of-systems/edit-layer/edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
  },
}
</script>
