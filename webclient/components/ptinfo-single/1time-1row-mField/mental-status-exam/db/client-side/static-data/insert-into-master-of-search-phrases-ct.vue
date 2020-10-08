<!-- Reference implementation -->
<!-- To understand how this works call-insert-search-phases-of-components-and-handle-selection.vue -->
<template>
  <div><insertIntoMasterTblOfMentalStatusExamDuringInitOfCt /></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/others/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'
import insertIntoMasterTblOfMentalStatusExamDuringInitOfCt from './insert-into-master-of-mental-status-exam-ct'

export default {
  components: { insertIntoMasterTblOfMentalStatusExamDuringInitOfCt },
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'mental status exam',
        ctAbbr: 'mse',
        ctToShow:
          'ptinfo-single/1time-1row-mField/mental-status-exam/view-layer/category-name-concatenated-using-cards-ct',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'mental status exam v2',
        ctAbbr: 'mse',
        ctToShow:
          'ptinfo-single/1time-1row-mField/mental-status-exam/view-layer/category-name-grouped-ct',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit mental status exam',
        ctAbbr: 'cmse',
        ctToShow: 'ptinfo-single/1time-1row-mField/mental-status-exam/edit-layer/edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
  },
}
</script>
