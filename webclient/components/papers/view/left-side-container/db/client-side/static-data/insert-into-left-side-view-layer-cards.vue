<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template></template>

<script>
import clientTblOfLeftSideCards from '@/components/papers/view/left-side-container/db/client-side/structure/left-hand-side-table-of-cards.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientTblOfLeftSideCards.insert({
      data: {
        name: 'Header',
        componentToShowPath: 'papers/view/left-side-header/sub-ct-container-design-using-card.vue',
        classificationOfComponent: 'commonForHealthAndOther',
      },
    })
    clientTblOfLeftSideCards.insert({
      data: {
        name: 'Appt note',
        componentToShowPath: 'papers/view/step1-decide-notes-to-show-and-their-appt-id.vue',
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
