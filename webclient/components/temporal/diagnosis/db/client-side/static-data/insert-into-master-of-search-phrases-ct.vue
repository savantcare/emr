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
        value: 'diagnosis',
        ctAbbr: 'rem',
        ctToShow: 'temporal/diagnosis/view-layer/timeline-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'add diagnosis',
        ctAbbr: 'arem',
        ctToShow: 'temporal/diagnosis/edit-layer/diagnosis-add.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit diagnosis',
        ctAbbr: 'crem',
        ctToShow: 'temporal/diagnosis/edit-layer/diagnosis-edit.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'multi edit diagnosis',
        ctAbbr: 'mcrem',
        ctToShow: 'temporal/diagnosis/edit-layer/medit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted diagnosis',
        ctAbbr: 'drem',
        ctToShow: 'temporal/diagnosis/view-layer/deleted.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
