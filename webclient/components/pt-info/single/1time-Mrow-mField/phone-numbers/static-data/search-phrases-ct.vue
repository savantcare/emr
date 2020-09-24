<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientSideTblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'phone numbers',
        ctAbbr: 'pn',
        ctToShow: 'pt-info/single/1time-Mrow-mField/phone-numbers/view-layer/table-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'add phone number',
        ctAbbr: 'apn',
        ctToShow: 'pt-info/single/1time-Mrow-mField/phone-numbers/edit-layer/add-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'edit phone number',
        ctAbbr: 'cpn',
        ctToShow: 'pt-info/single/1time-Mrow-mField/phone-numbers/edit-layer/c-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'multi edit phone numbers',
        ctAbbr: 'mcpn',
        ctToShow: 'pt-info/single/1time-Mrow-mField/phone-numbers/edit-layer/mc-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'deleted phone numbers',
        ctAbbr: 'dpn',
        ctToShow: 'pt-info/single/1time-Mrow-mField/phone-numbers/view-layer/deleted.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
