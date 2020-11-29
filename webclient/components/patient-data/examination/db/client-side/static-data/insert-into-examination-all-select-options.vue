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
      attitude_multi_select: [
        { label: 'Pleasent and cooperative' },
        { label: 'Uncooperative' },
        { label: 'Hostile or defiant' },
        { label: 'Guarded' },
        { label: 'Evasive' },
      ],
      psychomotor_select: [{ label: 'Agitated' }, { label: 'Retarded' }, { label: 'Other' }],
      eye_contact_multi_select: [
        { label: 'Appropriate' },
        { label: 'Downcast' },
        { label: 'Intense' },
        { label: 'Fleeting' },
      ],
    }

    let rowUniqId = 0
    let fldName = {}
    for (fldName in selectOptions) {
      const obj = selectOptions[fldName]
      for (let i = 0; i < obj.length; i++) {
        const label = obj[i].label
        examinationAllSelectOptionsTbl.insert({
          data: {
            examinationFieldOptionId: '#' + rowUniqId + '#', // # is the seperator charecter so toggle can work. Look inside manage-rows
            examinationFieldOptionLabel: label,
            examinationFieldNameInDb: fldName,
          },
        })
        rowUniqId++
      }
    }
  },
}
</script>
