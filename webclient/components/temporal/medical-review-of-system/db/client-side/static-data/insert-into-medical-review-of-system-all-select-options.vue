<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import medicalReviewOfSystemAllSelectOptionsTbl from '@/components/temporal/medical-review-of-system/db/client-side/structure/medical-review-of-system-all-select-options.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#', // # is the seperator charecter so toggle can work. Look inside manage-rows
        medicalReviewOfSystemFieldOptionLabel: 'Change in appetite',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Fatigue',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Change in weight',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'None',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Night sweats',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Difficulty sleeping',
        medicalReviewOfSystemFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Feeling hotter than everyone',
        medicalReviewOfSystemFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Sores that dont heal',
        medicalReviewOfSystemFieldNameInDb: 'psychomotor_select',
      },
    })
  },
}
</script>
