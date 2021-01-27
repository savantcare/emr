<template>
  <ctAddForm :_formDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import medicalReviewOfSystemOfAPatientTbl from '@/components/patient-data/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'

import { medicalReviewOfSystemFormDef } from '@/components/patient-data/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: medicalReviewOfSystemFormDef,
    }
  },
  created() {
    // Inside this fn 'this' will refer to this ct (parent) https://stackoverflow.com/questions/59826155/vue-callback-via-props-and-this
  },

  components: {
    ctAddForm,
  },
}
</script>
