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
        value: 'medical review of systems',
        ctAbbr: 'psh',
        ctToShow:
          '1time-eachField-1value/medical-review-of-systems/view-layer/medical-review-of-systems-design-1-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit medical review of systems',
        ctAbbr: 'epsh',
        ctToShow:
          '1time-eachField-1value/medical-review-of-systems/edit-layer/medical-review-of-systems-edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted medical review of systems',
        ctAbbr: 'dpsh',
        ctToShow: '1time-eachField-1value/medical-review-of-systems/view-layer/deleted.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
