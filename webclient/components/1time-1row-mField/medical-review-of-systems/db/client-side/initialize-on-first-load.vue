<template>
  <div>
    <initializeMedicalReviewOfSystemsComponent />
    <insertIntoMasterTblOfMedicalReviewOfSystemsDuringInitOfCt />
  </div>
</template>

<script>
import initializeMedicalReviewOfSystemsComponent from '@/components/1time-1row-mField/medical-review-of-systems/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertIntoMasterTblOfMedicalReviewOfSystemsDuringInitOfCt from '@/components/1time-1row-mField/medical-review-of-systems/db/client-side/static-data/insert-into-master-of-medical-review-of-systems-ct.vue'
// import insertIntoMasterTblOfMedicalReviewOfSystemsDuringInitOfCt from '@/components/1time-1row-mField/medical-review-of-systems/db/client-side/dynamic-data/get-initial-data-from-server-ct.vue'

export default {
  components: {
    initializeMedicalReviewOfSystemsComponent,
    insertIntoMasterTblOfMedicalReviewOfSystemsDuringInitOfCt,
  },
}
</script>
