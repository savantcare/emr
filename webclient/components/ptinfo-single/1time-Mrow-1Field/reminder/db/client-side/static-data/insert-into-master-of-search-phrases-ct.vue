<!-- Reference implementation -->
<!-- To understand how this works call-insert-search-phases-of-components-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/others/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'reminders',
        ctAbbr: 'rem',
        ctToShow: 'ptinfo-single/1time-Mrow-1Field/reminder/view-layer/timeline-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'add reminder',
        ctAbbr: 'arem',
        ctToShow: 'ptinfo-single/1time-Mrow-1Field/reminder/edit-layer/add-ct.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'edit reminder',
        ctAbbr: 'crem',
        ctToShow: 'ptinfo-single/1time-Mrow-1Field/reminder/edit-layer/edit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'multi edit reminders',
        ctAbbr: 'mcrem',
        ctToShow: 'ptinfo-single/1time-Mrow-1Field/reminder/edit-layer/medit-design-1.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'deleted reminders',
        ctAbbr: 'drem',
        ctToShow: 'ptinfo-single/1time-Mrow-1Field/reminder/view-layer/deleted.vue',
        displayLocation: 'edit-layer',
        ctWidthInEditLayer: 'large',
      },
    })
  },
}
</script>
