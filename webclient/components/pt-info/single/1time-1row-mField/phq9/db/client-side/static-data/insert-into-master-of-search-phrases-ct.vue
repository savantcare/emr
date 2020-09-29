<!-- To understand how this works read components/core/search-phrases/load-search-phrases-and-handle-selection.vue -->
<template>
  <div>
    <insertIntoMasterRowsOfPhq9Ct />
  </div>
</template>

<script>
import clientSideTblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'
import insertIntoMasterRowsOfPhq9Ct from './insert-into-master-of-phq9-ct.vue'
export default {
  components: { insertIntoMasterRowsOfPhq9Ct },
  data() {
    return {}
  },
  mounted() {
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'phq9',
        ctAbbr: 'h',
        ctToShow: 'pt-info/single/1time-1row-mField/phq9/view-layer/grid-with-cards-ct.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'phq9 edit',
        ctAbbr: 'hc',
        ctToShow: 'pt-info/single/1time-1row-mField/phq9/edit-layer/edit-design-1.vue',
        displayLocation: 'edit-layer',
        needsRowIdToWork: 'no',
        ctWidthInEditLayer: 'small',
      },
    })
  },
}
</script>