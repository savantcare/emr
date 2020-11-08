<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template></template>

<script>
import clientTblOfLeftSideCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientTblOfLeftSideCards.insert({
      data: {
        name: 'Header',
        componentToShowPath: 'non-temporal/layer-1-left-side-header/sub-ct-container-design-using-card.vue',
        classificationOfComponent: 'commonForHealthAndOther',
      },
    })
    clientTblOfLeftSideCards.insert({
      data: {
        name: 'Appt note',
        componentToShowPath:
          'non-temporal/paper-appt-note-with-amendment-or-modify-feature/step1-decide-notes-to-print-and-their-appt-id.vue',
        currentDisplayStateOfComponent: 1,
        firstParameterGivenToComponentBeforeMounting: 0,
        secondParameterGivenToComponentBeforeMounting: 0,
      },
    })
    clientTblOfLeftSideCards.insert({
      data: {
        name: 'Contacts',
        componentToShowPath: '1time-eachField-multiValuescontacts/view-layer/all-contacts-ct.vue',
        classificationOfComponent: 'other',
      },
    })
  },
}
</script>
