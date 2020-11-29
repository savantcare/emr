<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import examinationAllSelectOptionsTbl from '@/components/patient-data/examination/db/client-side/structure/examination-all-select-options.js'

export default {
  data() {
    return {}
  },
  mounted() {
    const selectOptions = {
      appearance_select: [
        { label: 'Good grooming and hygiene' },
        { label: 'No apparent distress' },
        { label: 'Well developed, well nourished' },
        { label: 'Appears stated age' },
        { label: 'Appears younger than stated age' },
        { label: 'Appears older than stated age' },
        { label: 'Obese' },
        { label: 'Thin or cachectic' },
        { label: 'Disheveled, unkempt' },
        { label: 'Malodorous' },
      ],
    }

    let i = 0
    let fldName = {}
    for (fldName in selectOptions) {
      const obj = selectOptions[fldName]
      for (let i = 0; i < obj.length; i++) {
        const label = obj[i].label
        examinationAllSelectOptionsTbl.insert({
          data: {
            examinationFieldOptionId: '#' + i + '#', // # is the seperator charecter so toggle can work. Look inside manage-rows
            examinationFieldOptionLabel: label,
            examinationFieldNameInDb: fldName,
          },
        })
      }
    }
  },
}
</script>
