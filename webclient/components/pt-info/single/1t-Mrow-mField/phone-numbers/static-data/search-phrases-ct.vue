<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/vuex-orm/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'phone numbers',
        ctAbbr: 'pn',
        ctToShow: 'pt-info/single/1t-Mrow-mField/phone-numbers/vl/table-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'add phone number',
        ctAbbr: 'apn',
        ctToShow: 'pt-info/single/1t-Mrow-mField/phone-numbers/cl/add-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'change phone number',
        ctAbbr: 'cpn',
        ctToShow: 'pt-info/single/1t-Mrow-mField/phone-numbers/cl/c-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'multi change phone numbers',
        ctAbbr: 'mcpn',
        ctToShow: 'pt-info/single/1t-Mrow-mField/phone-numbers/cl/mc-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'discontinued phone numbers',
        ctAbbr: 'dpn',
        ctToShow: 'pt-info/single/1t-Mrow-mField/phone-numbers/vl/discontinued.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
