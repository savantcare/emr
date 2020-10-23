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
        value: 'allergies',
        ctAbbr: 'rem',
        ctToShow: '1time-eachField-multiValues/allergies/view-layer/timeline-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'add allergies',
        ctAbbr: 'arem',
        ctToShow: '1time-eachField-multiValues/allergies/edit-layer/allergy-add.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit allergies',
        ctAbbr: 'crem',
        ctToShow: '1time-eachField-multiValues/allergies/edit-layer/allergy-edit.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'multi edit allergies',
        ctAbbr: 'mcrem',
        ctToShow: '1time-eachField-multiValues/allergies/edit-layer/medit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted allergies',
        ctAbbr: 'drem',
        ctToShow: '1time-eachField-multiValues/allergies/view-layer/deleted.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
