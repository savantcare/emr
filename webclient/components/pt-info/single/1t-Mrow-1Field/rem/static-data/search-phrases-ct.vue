<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/vuex-orm/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'reminders',
        ctAbbr: 'rem',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/rem/vl/timeline-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'add reminder',
        ctAbbr: 'arem',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/rem/cl/add-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'change reminder',
        ctAbbr: 'crem',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/rem/cl/c-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
        needsRowIdToWork: 'yes',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'multi change reminders',
        ctAbbr: 'mcrem',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/rem/cl/mc-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'discontinued reminders',
        ctAbbr: 'drem',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/rem/vl/discontinued.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'large',
      },
    })
  },
}
</script>
