<!-- Reference implementation -->
<!-- To understand how this works read manage-layer1-right-side-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div><insertIntoMasterTblOfDiagnosisDuringInitOfCt /></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'
import insertIntoMasterTblOfDiagnosisDuringInitOfCt from './insert-into-master-of-diagnosis-ct'

export default {
  components: { insertIntoMasterTblOfDiagnosisDuringInitOfCt },
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'diagnosis',
        ctAbbr: 'dx',
        ctToShow: '1time-Mrow-mField/diagnosis/view-layer/grid-with-cards-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    // clientSideTblOfCtSearchPhrases.insert({
    //   data: {
    //     value: 'change diagnosis',
    //     ctAbbr: 'cdx',
    //     ctToShow: '1time-Mrow-mField/diagnosis/edit-layer/edit-design-1.vue',
    //     displayLocation: 'edit-layer',
    //     ctWidthInCl: 'large', // small
    //     needsRowIdToWork: 'yes',
    //   },
    // })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'add diagnosis',
        ctAbbr: 'adx',
        ctToShow: '1time-Mrow-mField/diagnosis/edit-layer/edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInCl: 'small', // small
      },
    })
  },
}
</script>
