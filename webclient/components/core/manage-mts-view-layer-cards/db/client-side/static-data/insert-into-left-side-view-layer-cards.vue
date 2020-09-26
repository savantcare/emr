<!-- Reference implementation -->
<!-- To understand how this works call-insert-search-phases-of-components-and-handle-selection.vue -->
<template></template>

<script>
import clientSideTblOfLeftSideCards from '../structure/table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'mental status exam',
        ctToShow:
          'pt-info/single/1time-1row-mField/mental-status-exam/view-layer/category-name-concatenated-using-cards-ct', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'mental status exam v2',
        ctToShow:
          'pt-info/single/1time-1row-mField/mental-status-exam/view-layer/category-name-grouped-ct', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'edit mental status exam',
        ctToShow:
          'pt-info/single/1time-1row-mField/mental-status-exam/edit-layer/edit-design-1.vue',
      },
    })
  },
}
</script>
