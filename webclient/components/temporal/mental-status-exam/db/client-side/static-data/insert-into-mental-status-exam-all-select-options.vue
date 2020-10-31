<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import mentalStatusExamAllSelectOptionsTbl from '@/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-all-select-options.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '60',
        mentalStatusExamFieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '55',
        mentalStatusExamFieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '50',
        mentalStatusExamFieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '45',
        mentalStatusExamFieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '40',
        mentalStatusExamFieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Client Centered',
        mentalStatusExamFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Dialectical Behavior therapy',
        mentalStatusExamFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Holistic Therapy',
        mentalStatusExamFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Existential humanistic',
        mentalStatusExamFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Bibilotherapy',
        mentalStatusExamFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '60',
        mentalStatusExamFieldNameInDb: 'total_minutes_with_patient_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '55',
        mentalStatusExamFieldNameInDb: 'total_minutes_with_patient_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '50',
        mentalStatusExamFieldNameInDb: 'total_minutes_with_patient_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '45',
        mentalStatusExamFieldNameInDb: 'total_minutes_with_patient_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '40',
        mentalStatusExamFieldNameInDb: 'total_minutes_with_patient_select',
      },
    })
  },
}
</script>
