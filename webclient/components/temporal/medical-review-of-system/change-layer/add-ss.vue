<template>
  <ctAddStructure :propFormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//def-processors/change/add-form.vue'
import medicalReviewOfSystemAllSelectOptionsTbl from '../db/client-side/structure/medical-review-of-system-all-select-options.js'
import medicalReviewOfSystemOfAPatientTbl from '@/components/temporal/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'

import { medicalReviewOfSystemFormDef } from '@/components/temporal/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'

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
    ctAddStructure,
  },
}
</script>
