<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div><tblMasterListOfSSCt /></div>
</template>

<script>
import tblMasterListOfSSCt from './master-list-of-ss-ct'
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'

export default {
  components: { tblMasterListOfSSCt },
  data() {
    return {}
  },
  mounted() {
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'service statements',
        ctAbbr: 'ss',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/service-statement/view-layer/timeline-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'add service statement',
        ctAbbr: 'addss',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/service-statement/change-layer/add-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'change service statement',
        ctAbbr: 'css',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/service-statement/change-layer/c-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'multi change service statements',
        ctAbbr: 'mcss',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/service-statement/change-layer/mc-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'discontinued service statements',
        ctAbbr: 'dss',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/service-statement/view-layer/discontinued.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
