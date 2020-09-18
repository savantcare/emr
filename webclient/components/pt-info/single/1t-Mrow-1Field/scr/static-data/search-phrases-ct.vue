<!-- Reference implementation -->
<!-- To understand how this works read components/core/search-phrases/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'

export default {
  data() {
    return {}
  },
  mounted() {
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'screening',
        ctAbbr: 'scr',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/scr/vl/timeline-ct.vue',
        displayLocation: 'ptsVl',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'add screen',
        ctAbbr: 'ascr',
        ctToShow: 'pt-info/single/1t-Mrow-1Field/scr/cl/add-ct.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small',
      },
    })
  },
}
</script>
