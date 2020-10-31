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
        mentalStatusExamFieldOptionId: i + '#', // # is the seperator charecter so toggle can work. Look inside manage-rows
        mentalStatusExamFieldOptionLabel: 'Good grooming and hygiene',
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'No apparent distress',
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Well developed, well nourished',
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Appears stated age',
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Appears younger than stated age',
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Appears older than stated age',
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Obese',
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Thin or cachectic',
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Disheveled, unkempt',
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Malodorous',
        mentalStatusExamFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Pleasent and cooperative',
        mentalStatusExamFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Uncooperative',
        mentalStatusExamFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Hostile or defiant',
        mentalStatusExamFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Guarded',
        mentalStatusExamFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Evasive',
        mentalStatusExamFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Agitated',
        mentalStatusExamFieldNameInDb: 'psychomotor_select',
      },
    })

    i = i + 1
    mentalStatusExamAllSelectOptionsTbl.insert({
      data: {
        mentalStatusExamFieldOptionId: i + '#',
        mentalStatusExamFieldOptionLabel: 'Retarded',
        mentalStatusExamFieldNameInDb: 'psychomotor_select',
      },
    })
  },
}
</script>
