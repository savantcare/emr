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
      appearance_multi_select: [
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
      psychomotor_multi_select: [{ label: 'Agitated' }, { label: 'Retarded' }, { label: 'Other' }],
      eye_contact_multi_select: [
        { label: 'Appropriate' },
        { label: 'Downcast' },
        { label: 'Intense' },
        { label: 'Fleeting' },
      ],
      speech_multi_select: [
        { label: 'Regular, rate and rhythym' },
        { label: 'Fluent' },
        { label: 'Inchorent' },
        { label: 'Talkative' },
        { label: 'Pressured' },
        { label: 'Mumbling' },
        { label: 'Other' },
      ],
      mood_affect_multi_select: [
        { label: 'Euthymic' },
        { label: 'Stable' },
        { label: 'Dysphoric' },
        { label: 'Irritable' },
        { label: 'Angry' },
        { label: 'Bright' },
        { label: 'Euphoric' },
      ],
      thought_content_multi_select: [
        { label: 'No SI, intent or plan' },
        { label: 'No passive death wish' },
        { label: 'No HI, intent or plan' },
        { label: 'No delusional thinking observed' },
        { label: 'No obsessive thinking observed' },
        { label: 'Reminations' },
        { label: '+SI without intent or plan' },
        { label: '+SI as detailed below' },
        { label: '+HI as detailed below' },
        { label: '+delusions' },
        { label: '+IOR' },
        { label: '+obsessions' },
        { label: 'Other' },
        { label: 'Passive death wish' },
      ],
      perceptions_multi_select: [{ label: 'No AVH' }, { label: '+AH' }, { label: '+VH' }, { label: '+Command AH' }],
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
