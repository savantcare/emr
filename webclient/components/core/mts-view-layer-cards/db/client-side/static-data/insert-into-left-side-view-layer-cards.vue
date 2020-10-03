<!-- Reference implementation -->
<!-- To understand how this works call-insert-search-phases-of-components-and-handle-selection.vue -->
<template></template>

<script>
import clientSideTblOfLeftSideCards from '@/components/core/mts-view-layer-cards/db/client-side/structure/mts-table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Header',
        componentToShowPath: 'core/mts-view-layer-header/sub-ct-container-design-using-card.vue', // PtsVl -> Present time state - part of - view layer
        classificationOfComponent: 'commonForHealthAndOther',
      },
    })
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Appt note',
        componentToShowPath: 'pt-info/combined/appt-note-view-in-printable-state/design-1.vue', // PtsVl -> Present time state - part of - view layer
        componentCurrentValueForCustomizingViewState: 0,
      },
    })
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Correlate',
        componentToShowPath: 'pt-info/combined/correlate/design-1.vue',
      },
    })
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Body measurement',
        componentToShowPath: 'pt-info/single/1time-1row-mField/bm/view-layer/grid-ct.vue', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Reminder',
        componentToShowPath:
          'pt-info/single/1time-Mrow-1Field/reminder/view-layer/grid-design2-ct.vue', // PtsVl -> Present time state - part of - view layer
      },
    })
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Screening',
        componentToShowPath: 'pt-info/single/1time-Mrow-mField/scr/view-layer/table-ct.vue',
      },
    })
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Contacts',
        componentToShowPath:
          'pt-info/single/1time-Mrow-mField/contacts/view-layer/all-contacts-ct.vue',
        classificationOfComponent: 'other',
      },
    })
  },
}
</script>
