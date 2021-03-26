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
        value: 'process-notes',
        ctAbbr: 'pn',
        ctToShow: 'patient-data/process-notes/view-layer/timeline-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'add process-notes',
        ctAbbr: 'apn',
        ctToShow: 'patient-data/process-notes/change-layer/add-ct.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit process-notes',
        ctAbbr: 'cpn',
        ctToShow: 'patient-data/process-notes/change-layer/edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'multi edit process-notes',
        ctAbbr: 'mcpn',
        ctToShow: 'patient-data/process-notes/change-layer/medit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
    clientTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted process-notes',
        ctAbbr: 'dpn',
        ctToShow: 'patient-data/process-notes/view-layer/deleted.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
