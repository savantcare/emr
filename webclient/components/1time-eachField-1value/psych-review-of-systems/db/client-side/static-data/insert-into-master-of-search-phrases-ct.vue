<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div><insertIntoMasterTblOfPsychReviewOfSystemsDuringInitOfCt /></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'
import insertIntoMasterTblOfPsychReviewOfSystemsDuringInitOfCt from './insert-into-master-of-psych-review-of-systems-ct'

export default {
  components: { insertIntoMasterTblOfPsychReviewOfSystemsDuringInitOfCt },
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'psych review of systems',
        ctAbbr: 'ss',
        ctToShow: '1time-eachField-1value/psych-review-of-systems/view-layer/pros-view-design-1-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit psych review of systems',
        ctAbbr: 'css',
        ctToShow: '1time-eachField-1value/psych-review-of-systems/edit-layer/pros-edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
  },
}
</script>
