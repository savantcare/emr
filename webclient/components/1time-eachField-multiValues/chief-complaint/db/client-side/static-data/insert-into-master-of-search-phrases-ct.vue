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
        value: 'chief-complaint',
        ctAbbr: 'rem',
        ctToShow: '1time-eachField-multiValues/chief-complaint/view-layer/timeline-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'add chief-complaint',
        ctAbbr: 'arem',
        ctToShow: '1time-eachField-multiValues/chief-complaint/edit-layer/add-chief-complaint.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit chief-complaint',
        ctAbbr: 'crem',
        ctToShow: '1time-eachField-multiValues/chief-complaint/edit-layer/edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'multi edit chief-complaint',
        ctAbbr: 'mcrem',
        ctToShow: '1time-eachField-multiValues/chief-complaint/edit-layer/medit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted chief-complaint',
        ctAbbr: 'drem',
        ctToShow: '1time-eachField-multiValues/chief-complaint/view-layer/deleted.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
