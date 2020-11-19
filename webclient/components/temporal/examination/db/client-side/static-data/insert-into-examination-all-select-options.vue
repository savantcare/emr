<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import examinationAllSelectOptionsTbl from '@/components/temporal/examination/db/client-side/structure/examination-all-select-options.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#', // # is the seperator charecter so toggle can work. Look inside manage-rows
        examinationFieldOptionLabel: 'Good grooming and hygiene',
        examinationFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'No apparent distress',
        examinationFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Well developed, well nourished',
        examinationFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Appears stated age',
        examinationFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Appears younger than stated age',
        examinationFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Appears older than stated age',
        examinationFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Obese',
        examinationFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Thin or cachectic',
        examinationFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Disheveled, unkempt',
        examinationFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Malodorous',
        examinationFieldNameInDb: 'appearance_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Pleasent and cooperative',
        examinationFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Uncooperative',
        examinationFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Hostile or defiant',
        examinationFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Guarded',
        examinationFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Evasive',
        examinationFieldNameInDb: 'attitude_multi_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Agitated',
        examinationFieldNameInDb: 'psychomotor_select',
      },
    })

    i = i + 1
    examinationAllSelectOptionsTbl.insert({
      data: {
        examinationFieldOptionId: i + '#',
        examinationFieldOptionLabel: 'Retarded',
        examinationFieldNameInDb: 'psychomotor_select',
      },
    })
  },
}
</script>
