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
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '55',
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '50',
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '45',
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '40',
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Client Centered',
        mentalStatusExamFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Dialectical Behavior therapy',
        mentalStatusExamFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Holistic Therapy',
        mentalStatusExamFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Existential humanistic',
        mentalStatusExamFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Bibilotherapy',
        mentalStatusExamFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '60',
        mentalStatusExamFieldNameInDb: 'psychomotor_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '55',
        mentalStatusExamFieldNameInDb: 'psychomotor_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '50',
        mentalStatusExamFieldNameInDb: 'psychomotor_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '45',
        mentalStatusExamFieldNameInDb: 'psychomotor_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: '40',
        mentalStatusExamFieldNameInDb: 'psychomotor_select',
      },
    })
  },
}
</script>
