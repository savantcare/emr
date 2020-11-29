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
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#', // # is added since there is concatenation of multiple fieldOptionIds when multiple values are selected. Without # cannot differential between 1#11 and 111
        // there is a # at the begining since cannot differenntiate btween 6# and 16#
        fieldOptionLabel: 'Acceptance and commitement therapy',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#', // What is the reason for #? Read above for index 1#
        fieldOptionLabel: 'Bibilotherapy',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'CBT',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Client Centered',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Dialectical Behavior therapy',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'EMDR',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Existential humanistic',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Holistic Therapy',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Insight oriented',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Motivational interviewing',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Positive psychology',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Psycho analytic',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Psycho dynamic',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Solution focussed',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Supportive',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Trauma focussed',
        fieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'I have reviewed 2 or more systems with patient',
        fieldNameInDb: 'review_of_systems_multi_select',
      },
    })
    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'I performed 14pt review of systems',
        fieldNameInDb: 'review_of_systems_multi_select',
      },
    })
    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Pertinent Medical Records Reviewed',
        fieldNameInDb: 'optional_multi_select',
      },
    })
    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'CURES: checked on this patient and reviewed',
        subText: 'CURES is CA state controlled substance patient registry',
        fieldNameInDb: 'optional_multi_select',
      },
    })
    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Please refer to Assessment and Plan section',
        subText: 'for content of coordination of care and counseling',
        fieldNameInDb: 'optional_multi_select',
      },
    })
    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Further data and history obtained from family member',
        subText: 'as per patient’s consent.',
        fieldNameInDb: 'optional_multi_select',
      },
    })
    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Spent greater than 50 % of time face to face',
        subText: 'with patient and/or family doing counseling and/or coordination of care.',
        fieldNameInDb: 'optional_multi_select',
      },
    })
    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        fieldOptionLabel: 'Risks, benefits and side effects of psychotropic medications',
        subText: 'have been discussed with the patient.',
        fieldNameInDb: 'optional_multi_select',
      },
    })
  },
}
</script>
