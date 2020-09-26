<!-- Reference implementation -->
<!-- To understand how this works call-insert-search-phases-of-components-and-handle-selection.vue -->
<template></template>

<script>
import clientSideTblOfLeftSideCards from '@/components/core/manage-mts-view-layer-cards/db/client-side/structure/table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Header',
        ctToShowPath: 'core/mts-view-layer-header/sub-ct-container-design2.vue', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Appt note',
        ctToShowPath: 'pt-info/combined/note-preview/design-1.vue', // PtsVl -> Present time state - part of - view layer
        vIfState: 0,
      },
    })
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Body measurement',
        ctToShowPath: 'pt-info/single/1time-1row-mField/bm/view-layer/grid-ct.vue', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Reminder',
        ctToShowPath: 'pt-info/single/1time-Mrow-1Field/reminder/view-layer/grid-design2-ct.vue', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Screening',
        ctToShowPath: 'pt-info/single/1time-Mrow-mField/scr/view-layer/table-ct.vue',
      },
    })
  },
}
</script>
