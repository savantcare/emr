<!-- Reference implementation for non numeric hence no graph -->

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
        value: 'name',
        ctAbbr: 'n',
        ctToShow: 'pt-info/single/1t-1row-mField/name/vl/full-name-ct.vue',
        displayLocation: 'ptsVl', // PtsVl -> Present time state - part of - view layer
      },
    })
    tblSearchPhrasesOfCt.insert({
      data: {
        value: 'name - change',
        ctAbbr: 'nc',
        ctToShow: 'pt-info/single/1t-1row-mField/name/cl/c-ct.vue', // Cl -> Change layer
        displayLocation: 'cl',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
