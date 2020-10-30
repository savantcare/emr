<template>
  <ctAddStructure :propFormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//framework/change/add-form.vue'
import psychReviewOfSystemsAllSelectOptionsTbl from '../db/client-side/structure/psych-review-of-system-all-select-options.js'
import psychReviewOfSystemsOfAPatientTbl from '@/components/temporal/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'

import { psychReviewOfSystemsFormDef } from '@/components/temporal/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: psychReviewOfSystemsFormDef,
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
