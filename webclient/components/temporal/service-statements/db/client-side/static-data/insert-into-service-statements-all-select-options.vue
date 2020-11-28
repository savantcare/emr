<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import serviceStatementsAllSelectOptionsTbl from '@/components/temporal/service-statements/db/client-side/structure/service-statements-all-select-options.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
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
        serviceStatementFieldOptionLabel: 'Holistic Therapy',
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
        serviceStatementFieldOptionLabel: 'Bibilotherapy',
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
        serviceStatementFieldOptionLabel: 'I performed a complete review of systems',
        serviceStatementFieldNameInDb: 'review_of_systems_multi_select',
      },
    })
  },
}
</script>
