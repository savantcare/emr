<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/call-insert-search-phases-of-components-and-handle-selection.vue.vue -->
<template>
  <div></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'phone numbers',
        ctAbbr: 'pn',
        ctToShow: 'pt-info/single/1time-Mrow-mField/phone-numbers/view-layer/table-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'add phone number',
        ctAbbr: 'apn',
        ctToShow: 'pt-info/single/1time-Mrow-mField/phone-numbers/edit-layer/add-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit phone number',
        ctAbbr: 'cpn',
        ctToShow: 'pt-info/single/1time-Mrow-mField/phone-numbers/edit-layer/edit-design-1.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'multi edit phone numbers',
        ctAbbr: 'mcpn',
        ctToShow: 'pt-info/single/1time-Mrow-mField/phone-numbers/edit-layer/mc-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
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
