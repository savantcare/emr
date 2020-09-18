<template>
  <div></div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/components/core/search-phrases/search-phrases-of-components-table'

export default {
  data() {
    return {
      // dataTable: [],
    }
  },
  mounted() {
    // Search interfaces to this component
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'add diagnosis',
        ctAbbr: 'adddx',
        ctToShow: 'pt-info/single/dx/cl/ctAddDx.vue',
        displayLocation: 'cl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'diagnosis',
        ctAbbr: 'dx',
        ctToShow: 'pt-info/single/dx/dx-vl.vue',
        displayLocation: 'ptsVl',
      },
    })
    ormSearchPhrasesOfCt.insert({
      data: {
        value: 'multichange dx assessment',
        ctAbbr: 'mcdxa',
        ctToShow: 'pt-info/single/dx/cl/ctMultiChangeDxa.vue',
        displayLocation: 'cl',
      },
    })
  },
}
</script>
