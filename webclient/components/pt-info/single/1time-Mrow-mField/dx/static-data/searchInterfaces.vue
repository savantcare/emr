<template>
  <div></div>
</template>

<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'

export default {
  data() {
    return {
      // dataTable: [],
    }
  },
  mounted() {
    // Search interfaces to this component
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'add diagnosis',
        ctAbbr: 'adddx',
        ctToShow: 'pt-info/single/dx/change-layer/ctAddDx.vue',
        displayLocation: 'cl',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'diagnosis',
        ctAbbr: 'dx',
        ctToShow: 'pt-info/single/dx/dx-vl.vue',
        displayLocation: 'ptsVl',
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'multichange dx assessment',
        ctAbbr: 'mcdxa',
        ctToShow: 'pt-info/single/dx/change-layer/ctMultiChangeDxa.vue',
        displayLocation: 'cl',
      },
    })
  },
}
</script>
