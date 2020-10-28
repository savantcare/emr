<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div><insertIntoMasterTblOfMentalStatusExamDuringInitOfCt /></div>
</template>

<script>
import clientTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'
import insertIntoMasterTblOfMentalStatusExamDuringInitOfCt from './insert-into-master-of-mental-status-exam-ct'

export default {
  components: { insertIntoMasterTblOfMentalStatusExamDuringInitOfCt },
  data() {
    return {}
  },
  mounted() {
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'mental status exam',
        ctAbbr: 'mse',
        ctToShow: 'temporal/mental-status-exam/view-layer/category-name-concatenated-using-cards-ct',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'mental status exam v2',
        ctAbbr: 'mse',
        ctToShow: 'temporal/mental-status-exam/view-layer/category-name-grouped-ct',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit mental status exam',
        ctAbbr: 'cmse',
        ctToShow: 'temporal/mental-status-exam/change-layer/edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
  },
}
</script>
