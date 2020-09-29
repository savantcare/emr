<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div><masterList /></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'
import masterList from './master-list-of-dx-ct'

export default {
  components: { masterList },
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'diagnosis',
        ctAbbr: 'dx',
        ctToShow: 'pt-info/single/1time-Mrow-mField/diagnosis/view-layer/grid-with-cards-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    // clientSideTblOfCtSearchPhrases.insert({
    //   data: {
    //     value: 'change diagnosis',
    //     ctAbbr: 'cdx',
    //     ctToShow: 'pt-info/single/1time-Mrow-mField/diagnosis/edit-layer/edit-design-1.vue',
    //     displayLocation: 'edit-layer',
    //     ctWidthInCl: 'large', // small
    //     needsRowIdToWork: 'yes',
    //   },
    // })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'add diagnosis',
        ctAbbr: 'adx',
        ctToShow: 'pt-info/single/1time-Mrow-mField/diagnosis/edit-layer/edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInCl: 'small', // small
      },
    })
  },
}
</script>
