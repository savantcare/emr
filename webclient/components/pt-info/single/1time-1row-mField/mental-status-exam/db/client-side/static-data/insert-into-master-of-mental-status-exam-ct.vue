<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientSideTblMasterMentalStatusExam from '@/components/pt-info/single/1time-1row-mField/mental-status-exam/db/client-side/structure/master-table-of-mental-status-exam.js'

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Good grooming and hygiene',
        mentalStatusExamCategory: 'Appearance',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'No apparennt distress',
        mentalStatusExamCategory: 'Appearance',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Well developed, well nourished',
        mentalStatusExamCategory: 'Appearance',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Appears stated age',
        mentalStatusExamCategory: 'Appearance',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Appears younger than stated age',
        mentalStatusExamCategory: 'Appearance',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Appears older than stated age',
        mentalStatusExamCategory: 'Appearance',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Obese',
        mentalStatusExamCategory: 'Appearance',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Thin or cachectic',
        mentalStatusExamCategory: 'Appearance',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Disheveled, unkempt',
        mentalStatusExamCategory: 'Appearance',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Malodorous',
        mentalStatusExamCategory: 'Appearance',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Other',
        mentalStatusExamCategory: 'Appearance',
        mentalStatusExamFieldType: 'input',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Pleasant and cooperative',
        mentalStatusExamCategory: 'Attitude',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Uncooperative',
        mentalStatusExamCategory: 'Attitude',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Hostile or defiant',
        mentalStatusExamCategory: 'Attitude',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Guarded',
        mentalStatusExamCategory: 'Attitude',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Evasive',
        mentalStatusExamCategory: 'Attitude',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Apathetic',
        mentalStatusExamCategory: 'Attitude',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Disorganized behavior',
        mentalStatusExamCategory: 'Attitude',
      },
    })

    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Other',
        mentalStatusExamCategory: 'Attitude',
        mentalStatusExamFieldType: 'input',
      },
    })

    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Agitated',
        mentalStatusExamCategory: 'Psychomotor',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Retarded',
        mentalStatusExamCategory: 'Psychomotor',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Appropriate',
        mentalStatusExamCategory: 'Eye-contact',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Downcast',
        mentalStatusExamCategory: 'Eye-contact',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Intense',
        mentalStatusExamCategory: 'Eye-contact',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Fleeting',
        mentalStatusExamCategory: 'Eye-contact',
      },
    })
    i = i + 1
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: i,
        mentalStatusExamDescription: 'Regular, rate and rhythm',
        mentalStatusExamCategory: 'Speech',
      },
    })
  },
}
</script>
