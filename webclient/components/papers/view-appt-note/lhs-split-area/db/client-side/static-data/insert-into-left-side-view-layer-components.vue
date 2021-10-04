<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template></template>

<script>
import clientTblOfLeftSideCards from '@/components/papers/view-appt-note/lhs-split-area/db/client-side/structure/left-hand-side-table-of-components.js'

export default {
  data() {
    return {}
  },
  mounted() {
    /*clientTblOfLeftSideCards.insert({
      data: {
        name: 'Header',
        componentToShowPath: 'papers/view-appt-note/lhs-split-area/header/sub-ct-container-design-using-card.vue',
        classificationOfComponent: 'commonForHealthAndOther',
      },
    })*/
    clientTblOfLeftSideCards.insert({
      data: {
        name: 'Appt note',
        componentToShowPath:
          'papers/view-appt-note/templates/seq1-decide-comparison-or-single-note-and-their-appt-id.vue',
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
