<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import phq9AllSelectOptionsTbl from '@/components/temporal/phq9/db/client-side/structure/phq9-all-select-options.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: '60',
        phq9FieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: '55',
        phq9FieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: '50',
        phq9FieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: '45',
        phq9FieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: '40',
        phq9FieldNameInDb: 'total_minutes_in_psychotherapy_select',
      },
    })

    i = i + 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: 'Client Centered',
        phq9FieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: 'Dialectical Behavior therapy',
        phq9FieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: 'Holistic Therapy',
        phq9FieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: 'Existential humanistic',
        phq9FieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: 'Bibilotherapy',
        phq9FieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: '60',
        phq9FieldNameInDb: 'total_minutes_with_patient_select',
      },
    })

    i = i + 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: '55',
        phq9FieldNameInDb: 'total_minutes_with_patient_select',
      },
    })

    i = i + 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: '50',
        phq9FieldNameInDb: 'total_minutes_with_patient_select',
      },
    })

    i = i + 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: '45',
        phq9FieldNameInDb: 'total_minutes_with_patient_select',
      },
    })

    i = i + 1
    phq9AllSelectOptionsTbl.insert({
      data: {
        phq9FieldOptionId: i + '#',
        phq9FieldOptionLabel: '40',
        phq9FieldNameInDb: 'total_minutes_with_patient_select',
      },
    })
  },
}
</script>
