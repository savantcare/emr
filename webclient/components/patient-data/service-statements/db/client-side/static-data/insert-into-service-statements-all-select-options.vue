<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import serviceStatementsAllSelectOptionsTbl from '@/components/patient-data/service-statements/db/client-side/structure/service-statements-all-select-options.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
    const selectOptions = {
      modality_of_psychotherapy_multi_select: [
        { label: 'Acceptance and commitement therapy' },
        { label: 'Bibilotherapy' },
        { label: 'CBT' },
        { label: 'Client Centered' },
        { label: 'Dialectical Behavior therapy' },
        { label: 'EMDR' },
        { label: 'Existential humanistic' },
        { label: 'Holistic Therapy' },
        { label: 'Insight oriented' },
        { label: 'Motivational interviewing' },
        { label: 'Positive psychology' },
        { label: 'Psycho analytic' },
        { label: 'Psycho dynamic' },
        { label: 'Solution focussed' },
        { label: 'Supportive' },
        { label: 'Trauma focussed' },
      ],
      review_of_systems_multi_select: [
        { label: 'I have reviewed 2 or more systems with patient' },
        { label: 'I performed 14pt review of systems' },
      ],
      optional_multi_select: [
        {
          label: 'Pertinent Medical Records Reviewed',
          subText: 'CURES is CA state controlled substance patient registry',
        },

        {
          label: 'Please refer to Assessment and Plan section',
          subText: 'for content of coordination of care and counseling',
        },

        { label: 'Further data and history obtained from family member', subText: 'as per patient’s consent.' },

        {
          label: 'Spent greater than 50 % of time face to face',
          subText: 'with patient and/or family doing counseling and/or coordination of care.',
        },

        {
          label: 'Risks, benefits and side effects of psychotropic medications',
          subText: 'have been discussed with the patient.',
        },
      ],
    }

    let rowUniqId = 0
    let fldName = {}
    for (fldName in selectOptions) {
      const obj = selectOptions[fldName]
      for (let i = 0; i < obj.length; i++) {
        const label = obj[i].label
        serviceStatementsAllSelectOptionsTbl.insert({
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
