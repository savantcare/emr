<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import medicalReviewOfSystemAllSelectOptionsTbl from '@/components/patient-data/medical-review-of-system/db/client-side/structure/medical-review-of-system-all-select-options.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: i + '#', // # is the seperator charecter so toggle can work. Look inside manage-rows
        fieldOptionLabel: 'Change in appetite',
        fieldNameInDb: 'recently_noticed_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: i + '#',
        fieldOptionLabel: 'Fatigue',
        fieldNameInDb: 'recently_noticed_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: i + '#',
        fieldOptionLabel: 'Change in weight',
        fieldNameInDb: 'recently_noticed_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: i + '#',
        fieldOptionLabel: 'None',
        fieldNameInDb: 'recently_noticed_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: i + '#',
        fieldOptionLabel: 'Night sweats',
        fieldNameInDb: 'recently_noticed_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: i + '#',
        fieldOptionLabel: 'Difficulty sleeping',
        fieldNameInDb: 'constitutional_systems_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: i + '#',
        fieldOptionLabel: 'Feeling hotter than everyone',
        fieldNameInDb: 'constitutional_systems_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: i + '#',
        fieldOptionLabel: 'Sores that dont heal',
        fieldNameInDb: 'skin_conditions_select',
      },
    })
  },
}
</script>
