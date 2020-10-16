<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
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
        value: 'past psych historys',
        ctAbbr: 'ss',
        ctToShow: '1time-Mrow-1Field/service-statement/view-layer/ss-design-1-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit past psych history',
        ctAbbr: 'sse',
        ctToShow: '1time-Mrow-1Field/service-statement/edit-layer/ss-edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted past psych historys',
        ctAbbr: 'dss',
        ctToShow: '1time-Mrow-1Field/service-statement/view-layer/deleted.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
