<!-- Reference implementation -->
<!-- To understand how this works call-init-of-components-and-handle-search-selection.vue -->
<template></template>

<script>
import clientSideTblOfMultiTimeStateCards from '@/components/others/components-container-in-lhs-of-layer1/db/client-side/structure/mts-table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfMultiTimeStateCards.insert({
      data: {
        name: 'Header',
        componentToShowPath:
          'others/layer-1-left-side-header/sub-ct-container-design-using-card.vue',
        classificationOfComponent: 'commonForHealthAndOther',
      },
    })
    clientSideTblOfMultiTimeStateCards.insert({
      data: {
        name: 'Appt note',
        componentToShowPath:
          'ptinfo-combined/printable-appt-note-with-amendment-or-modify-feature/design-1.vue',
        componentCurrentValueForCustomizingViewState: 5,
      },
    })
    clientSideTblOfMultiTimeStateCards.insert({
      data: {
        name: 'Contacts',
        componentToShowPath:
          'ptinfo-single/1time-Mrow-mField/contacts/view-layer/all-contacts-ct.vue',
        classificationOfComponent: 'other',
      },
    })
  },
}
</script>
