<!-- Reference implementation -->
<!-- To understand how this works call-insert-search-phases-of-components-and-handle-selection.vue -->
<template></template>

<script>
import clientSideTblOfMultiTimeStateCards from '@/components/others/layer-1-left-side-components/db/client-side/structure/mts-table.js'

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
          'ptinfo-combined/appt-note-printable-with-amendment-feature/design-1.vue',
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
