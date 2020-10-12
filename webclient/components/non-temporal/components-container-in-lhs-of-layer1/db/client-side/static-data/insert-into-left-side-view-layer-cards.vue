<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template></template>

<script>
import clientSideTblOfLeftSideCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Header',
        componentToShowPath:
          'non-temporal/layer-1-left-side-header/sub-ct-container-design-using-card.vue',
        classificationOfComponent: 'commonForHealthAndOther',
      },
    })
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Appt note',
        componentToShowPath:
          'non-temporal/printable-appt-note-with-amendment-or-modify-feature/component-to-display-one-note-or-two-appt-notes-together.vue',
        componentCurrentValueForCustomizingViewState: 5,
      },
    })
    clientSideTblOfLeftSideCards.insert({
      data: {
        name: 'Contacts',
        componentToShowPath: '1time-Mrow-mField/contacts/view-layer/all-contacts-ct.vue',
        classificationOfComponent: 'other',
      },
    })
  },
}
</script>
