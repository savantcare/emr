<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import psychReviewOfSystemsAllSelectOptionsTbl from '@/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-all-select-options.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: '60',
        psychReviewOfSystemFieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: '55',
        psychReviewOfSystemFieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: '50',
        psychReviewOfSystemFieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: '45',
        psychReviewOfSystemFieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: '40',
        psychReviewOfSystemFieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: 'Client Centered',
        psychReviewOfSystemFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: 'Dialectical Behavior therapy',
        psychReviewOfSystemFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: 'Holistic Therapy',
        psychReviewOfSystemFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: 'Existential humanistic',
        psychReviewOfSystemFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: 'Bibilotherapy',
        psychReviewOfSystemFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: '60',
        psychReviewOfSystemFieldNameInDb: 'total_minutes_with_patient_select',
      },
    })

    i = i + 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: '55',
        psychReviewOfSystemFieldNameInDb: 'total_minutes_with_patient_select',
      },
    })

    i = i + 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: '50',
        psychReviewOfSystemFieldNameInDb: 'total_minutes_with_patient_select',
      },
    })

    i = i + 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: '45',
        psychReviewOfSystemFieldNameInDb: 'total_minutes_with_patient_select',
      },
    })

    i = i + 1
    psychReviewOfSystemsAllSelectOptionsTbl.insert({
      data: {
        psychReviewOfSystemFieldOptionId: i + '#',
        psychReviewOfSystemFieldOptionLabel: '40',
        psychReviewOfSystemFieldNameInDb: 'total_minutes_with_patient_select',
      },
    })
  },
}
</script>
