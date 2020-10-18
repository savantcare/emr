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
        medicalReviewOfSystemsDescription: 'Change in appetite',
        medicalReviewOfSystemsCategory: 'Q1: Have you recently noticed any of the following',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'Change in weight',
        medicalReviewOfSystemsCategory: 'Q1: Have you recently noticed any of the following',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'Night sweats',
        medicalReviewOfSystemsCategory: 'Q1: Have you recently noticed any of the following',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'Fatigue',
        medicalReviewOfSystemsCategory: 'Q1: Have you recently noticed any of the following',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'None',
        medicalReviewOfSystemsCategory: 'Q1: Have you recently noticed any of the following',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'Difficulty sleeping',
        medicalReviewOfSystemsCategory: 'Q2: Constitutional Symptoms',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'Feeling hoter than everyone',
        medicalReviewOfSystemsCategory: 'Q2: Constitutional Symptoms',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'Sores that dont heal',
        medicalReviewOfSystemsCategory: 'Q3: Skin Conditions',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'Seasonal allergier',
        medicalReviewOfSystemsCategory: 'Q4: Allergies - Do you have',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'Pain in the front of your neck',
        medicalReviewOfSystemsCategory: 'Q5: Ears/Nose/Mouth Throat: Have you recently had',
      },
    })

    i = i + 1
    clientSideTblOfMasterMedicalReviewOfSystems.insert({
      data: {
        medicalReviewOfSystemsMasterId: i,
        medicalReviewOfSystemsDescription: 'Loss of vision',
        medicalReviewOfSystemsCategory: 'Q6: Eyes/Head: Have you recently had',
      },
    })
  },
}
</script>
