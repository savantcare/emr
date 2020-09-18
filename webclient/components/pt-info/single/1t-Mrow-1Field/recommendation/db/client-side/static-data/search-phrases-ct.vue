<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'recommendations',
        ctAbbr: 'rec',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/recommendation/view-layer/timeline-ct.vue',
        displayLocation: 'ptsVl',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'add recommendation',
        ctAbbr: 'arec',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/recommendation/change-layer/add-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'change recommendation',
        ctAbbr: 'crec',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/recommendation/change-layer/c-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'multi change recommendations',
        ctAbbr: 'mcrec',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/recommendation/change-layer/mc-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'discontinued recommendations',
        ctAbbr: 'drec',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/recommendation/view-layer/discontinued.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
