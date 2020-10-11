<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'phone numbers',
        ctAbbr: 'pn',
        ctToShow: '1time-Mrow-mField/phone-numbers/view-layer/table-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'add phone number',
        ctAbbr: 'apn',
        ctToShow: '1time-Mrow-mField/phone-numbers/edit-layer/add-ct.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit phone number',
        ctAbbr: 'cpn',
        ctToShow: '1time-Mrow-mField/phone-numbers/edit-layer/edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'multi edit phone numbers',
        ctAbbr: 'mcpn',
        ctToShow: '1time-Mrow-mField/phone-numbers/edit-layer/mc-ct.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted phone numbers',
        ctAbbr: 'dpn',
        ctToShow: '1time-Mrow-mField/phone-numbers/view-layer/deleted.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
