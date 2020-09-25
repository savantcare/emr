<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div><masterList /></div>
</template>

<script>
import clientSideTblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'
import masterList from './master-list-of-dx-ct'

export default {
  components: { masterList },
  data() {
    return {}
  },
  mounted() {
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'diagnosis',
        ctAbbr: 'dx',
        ctToShow: 'pt-info/single/1time-Mrow-mField/diagnosis/view-layer/table-ct.vue', // PtsVl -> Present time state - part of - view layer
        displayLocation: 'ptsVl',
      },
    })
    // clientSideTblSearchPhrasesOfCt.insert({
    //   data: {
    //     value: 'change diagnosis',
    //     ctAbbr: 'cdx',
    //     ctToShow: 'pt-info/single/1time-Mrow-mField/diagnosis/edit-layer/edit-design.vue',
    //     displayLocation: 'cl',
    //     ctWidthInCl: 'large', // small
    //     needsRowIdToWork: 'yes',
    //   },
    // })
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'add diagnosis',
        ctAbbr: 'adx',
        ctToShow: 'pt-info/single/1time-Mrow-mField/diagnosis/edit-layer/edit-design.vue',
        displayLocation: 'cl',
        ctWidthInCl: 'small', // small
      },
    })
  },
}
</script>
