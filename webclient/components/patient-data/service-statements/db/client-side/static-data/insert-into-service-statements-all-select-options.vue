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

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Acceptance and commitement therapy',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Bibilotherapy',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'CBT',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Client Centered',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Dialectical Behavior therapy',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'EMDR',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Existential humanistic',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Holistic Therapy',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Insight oriented',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Motivational interviewing',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Positive psychology',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Psycho analytic',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Psycho dynamic',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Solution focussed',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Supportive',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Trauma focussed',
        serviceStatementFieldNameInDb: 'modality_of_psychotherapy_multi_select',
      },
    })

    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'I have reviewed 2 or more systems with patient',
        serviceStatementFieldNameInDb: 'review_of_systems_multi_select',
      },
    })
    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'I performed 14pt review of systems',
        serviceStatementFieldNameInDb: 'review_of_systems_multi_select',
      },
    })
    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel: 'Pertinent Medical Records Reviewed',
        serviceStatementFieldNameInDb: 'optional_multi_select',
      },
    })
    i = i + 1
    serviceStatementsAllSelectOptionsTbl.insert({
      data: {
        serviceStatementFieldOptionId: i + '#',
        serviceStatementFieldOptionLabel:
          'CURES: CA state controlled substance patient registry was checked on this patient and reviewed',
        serviceStatementFieldNameInDb: 'optional_multi_select',
      },
    })
  },
}
</script>
