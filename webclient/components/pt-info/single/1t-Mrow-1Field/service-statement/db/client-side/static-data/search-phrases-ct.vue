<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'
// import tblMasterListOfSS from '@/components/pt-info/single/1t-Mrow-1Field/service-statement/db/client-side/structure/table-master-list-of-ss'

export default {
  data() {
    return {}
  },
  mounted() {
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'service statements',
        ctAbbr: 'rem',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/service-statement/view-layer/timeline-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'add service statement',
        ctAbbr: 'arem',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/service-statement/change-layer/add-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'change service statement',
        ctAbbr: 'crem',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/service-statement/change-layer/c-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'multi change service statements',
        ctAbbr: 'mcrem',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/service-statement/change-layer/mc-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'discontinued service statements',
        ctAbbr: 'drem',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/service-statement/view-layer/discontinued.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
