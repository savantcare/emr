<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'recommendations',
        ctAbbr: 'rem',
        ctToShow: 'temporal/recommendations/view-layer/timeline-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'add recommendations',
        ctAbbr: 'arem',
        ctToShow: 'temporal/recommendations/edit-layer/add-ct.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit recommendation',
        ctAbbr: 'crem',
        ctToShow: 'temporal/recommendations/edit-layer/edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'multi edit recommendations',
        ctAbbr: 'mcrem',
        ctToShow: 'temporal/recommendations/edit-layer/medit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted recommendations',
        ctAbbr: 'drem',
        ctToShow: 'temporal/recommendations/view-layer/deleted.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
