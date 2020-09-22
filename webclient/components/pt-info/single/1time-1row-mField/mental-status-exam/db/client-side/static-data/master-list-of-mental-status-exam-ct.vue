<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientSideTblMasterMentalStatusExam from '@/components/pt-info/single/1time-1row-mField/mental-status-exam/db/client-side/structure/table-master-list-of-mental-status-exam.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '1', // this is uuid-1 to easily distinhuish it from the same row field -> id
        mentalStatusExamDescription: 'Good gromming and hegine',
        mentalStatusExamCategory: 'Appearence',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '2',
        mentalStatusExamDescription: 'No apparennt distress',
        mentalStatusExamCategory: 'Appearence',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '3',
        mentalStatusExamDescription: '80 minutes',
        mentalStatusExamCategory: 'Appearence',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '4',
        mentalStatusExamDescription: '75 minutes',
        mentalStatusExamCategory: 'Appearence',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '5',
        mentalStatusExamDescription: '70 minutes',
        mentalStatusExamCategory: 'Appearence',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '6',
        mentalStatusExamDescription: 'Client Centered',
        mentalStatusExamCategory: 'Modality of Psychotherapy',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '7',
        mentalStatusExamDescription: 'Dialectical Behavior therapy',
        mentalStatusExamCategory: 'Modality of Psychotherapy',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '8',
        mentalStatusExamDescription: 'Holistic Therapy',
        mentalStatusExamCategory: 'Modality of Psychotherapy',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '9',
        mentalStatusExamDescription: 'Existential humanistic',
        mentalStatusExamCategory: 'Modality of Psychotherapy',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '10',
        mentalStatusExamDescription: 'Bibilotherapy',
        mentalStatusExamCategory: 'Modality of Psychotherapy',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '11',
        mentalStatusExamDescription: '60',
        mentalStatusExamCategory: 'Total time with patient',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '12',
        mentalStatusExamDescription: '55',
        mentalStatusExamCategory: 'Total time with patient',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '13',
        mentalStatusExamDescription: '50',
        mentalStatusExamCategory: 'Total time with patient',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '14',
        mentalStatusExamDescription: '45',
        mentalStatusExamCategory: 'Total time with patient',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '15',
        mentalStatusExamDescription: '40',
        mentalStatusExamCategory: 'Total time with patient',
      },
    })
  },
}
</script>
