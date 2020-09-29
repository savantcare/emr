<!-- Reference implementation for non numeric hence no graph -->

<template>
  <div></div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'name',
        ctAbbr: 'n',
        ctToShow: 'pt-info/single/1time-1row-mField/name/view-layer/full-name-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'name - edit',
        ctAbbr: 'nc',
        ctToShow: 'pt-info/single/1time-1row-mField/name/edit-layer/edit-design-1.vue', // Cl -> Change layer
        displayLocation: 'edit-layer',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
