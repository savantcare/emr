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
        medicalReviewOfSystemFieldOptionLabel: 'Good grooming and hygiene',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'No apparent distress',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Well developed, well nourished',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Appears stated age',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Appears younger than stated age',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Appears older than stated age',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Obese',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Thin or cachectic',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Disheveled, unkempt',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Malodorous',
        medicalReviewOfSystemFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Pleasent and cooperative',
        medicalReviewOfSystemFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Uncooperative',
        medicalReviewOfSystemFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Hostile or defiant',
        medicalReviewOfSystemFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Guarded',
        medicalReviewOfSystemFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Evasive',
        medicalReviewOfSystemFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Agitated',
        medicalReviewOfSystemFieldNameInDb: 'psychomotor_select',
      },
    })

    i = i + 1
    medicalReviewOfSystemAllSelectOptionsTbl.insert({
      data: {
        medicalReviewOfSystemFieldOptionId: i + '#',
        medicalReviewOfSystemFieldOptionLabel: 'Retarded',
        medicalReviewOfSystemFieldNameInDb: 'psychomotor_select',
      },
    })
  },
}
</script>
