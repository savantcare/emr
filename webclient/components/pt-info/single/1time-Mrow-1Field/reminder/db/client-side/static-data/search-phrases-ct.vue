<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientSideTblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'reminders',
        ctAbbr: 'rem',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/reminder/view-layer/timeline-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'add reminder',
        ctAbbr: 'arem',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/reminder/change-layer/add-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'change reminder',
        ctAbbr: 'crem',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/reminder/change-layer/c-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'multi change reminders',
        ctAbbr: 'mcrem',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/reminder/change-layer/mc-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'deleted reminders',
        ctAbbr: 'drem',
        ctToShow: 'pt-info/single/1time-Mrow-1Field/reminder/view-layer/deleted.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
