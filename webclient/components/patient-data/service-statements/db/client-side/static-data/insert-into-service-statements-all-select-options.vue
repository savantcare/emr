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
        serviceStatementFieldOptionLabel: 'Acceptance and commitement therapy',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#', // What is the reason for #? Read above for index 1#
        serviceStatementFieldOptionLabel: 'Bibilotherapy',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'CBT',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'Client Centered',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'Dialectical Behavior therapy',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'EMDR',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'Existential humanistic',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'Holistic Therapy',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'Insight oriented',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'Motivational interviewing',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'Positive psychology',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'Psycho analytic',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'Psycho dynamic',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'Solution focussed',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'Supportive',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'Trauma focussed',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'I have reviewed 2 or more systems with patient',
        serviceStatementFieldNameInDb: 'review_of_systems_multi_select',
      },
    })
    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'I performed 14pt review of systems',
        serviceStatementFieldNameInDb: 'review_of_systems_multi_select',
      },
    })
    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel: 'Pertinent Medical Records Reviewed',
        serviceStatementFieldNameInDb: 'optional_multi_select',
      },
    })
    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        fieldOptionId: '#' + i + '#',
        serviceStatementFieldOptionLabel:
          'CURES: CA state controlled substance patient registry was checked on this patient and reviewed',
        serviceStatementFieldNameInDb: 'optional_multi_select',
      },
    })
  },
}
</script>
