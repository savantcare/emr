<!-- Reference implementation for non numeric hence no graph -->

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
        value: 'name',
        ctAbbr: 'n',
        ctToShow: 'ptinfo-single/1time-1row-mField/name/view-layer/full-name-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'name - edit',
        ctAbbr: 'nc',
        ctToShow: 'ptinfo-single/1time-1row-mField/name/edit-layer/edit-design-1.vue', // El -> Edit layer
        displayLocation: 'edit-layer',
        needsRowIdToWork: 'no',
      },
    })
  },
}
</script>
