<!-- Reference implementation -->
<!-- To understand how this works call-init-of-components-and-handle-search-selection.vue -->
<template></template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'service statements',
        ctAbbr: 'ss',
        ctToShow: '1time-Mrow-1Field/service-statement/view-layer/ss-design-1-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit service statement',
        ctAbbr: 'sse',
        ctToShow: '1time-Mrow-1Field/service-statement/edit-layer/ss-edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted service statements',
        ctAbbr: 'dss',
        ctToShow: '1time-Mrow-1Field/service-statement/view-layer/deleted.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
