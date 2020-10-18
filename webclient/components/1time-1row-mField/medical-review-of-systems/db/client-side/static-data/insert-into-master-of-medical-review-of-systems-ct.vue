<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientSideTblOfMasterMedicalReviewOfSystems from '@/components/1time-1row-mField/medical-review-of-systems/db/client-side/structure/master-table-of-medical-review-of-systems.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'Past outpatient treatment',
        medicalReviewOfSystemsCategory: 'Past outpatient treatment',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'Past meds trials',
        medicalReviewOfSystemsCategory: 'Past meds trials',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'Hospitalization',
        medicalReviewOfSystemsCategory: 'Hospitalization',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'History of violence',
        medicalReviewOfSystemsCategory: 'History of violence',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'History of self-harm',
        medicalReviewOfSystemsCategory: 'History of self-harm',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'Past substance abuse',
        medicalReviewOfSystemsCategory: 'Past substance abuse',
      },
    })
  },
}
</script>
