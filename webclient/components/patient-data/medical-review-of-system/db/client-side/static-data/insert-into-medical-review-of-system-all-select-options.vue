<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import medicalReviewOfSystemAllSelectOptionsTbl from '@/components/patient-data/medical-review-of-system/db/client-side/structure/medical-review-of-system-all-select-options.js'

export default {
  data() {
    return {}
  },
  mounted() {
    const selectOptions = {
      recently_noticed_select: [
        { label: 'Change in appetite' },
        { label: 'Fatigue' },
        { label: 'Change in weight' },
        { label: 'None' },
        { label: 'Night sweats' },
      ],
      constitutional_systems_select: [{ label: 'Difficulty sleeping' }, { label: 'Feeling hotter than everyone' }],
      skin_conditions_select: [{ label: 'Sores that dont heal' }],
    }
    let rowUniqId = 0
    let fldName = {}
    for (fldName in selectOptions) {
      const obj = selectOptions[fldName]
      for (let i = 0; i < obj.length; i++) {
        const label = obj[i].label
        medicalReviewOfSystemAllSelectOptionsTbl.insert({
          data: {
            fieldOptionId: '#' + rowUniqId + '#', // # is the seperator charecter so toggle can work. Look inside manage-rows
            fieldOptionLabel: label,
            fieldNameInDb: fldName,
          },
        })
        rowUniqId++
      }
    }
  },
}
</script>
