<template>
  <ctAddStructure :_formDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//def-processors/change/add-form.vue'
import examinationAllSelectOptionsTbl from '../db/client-side/structure/examination-all-select-options.js'
import examinationOfAPatientTbl from '@/components/temporal/examination/db/client-side/structure/examination-of-a-patient-table.js'

import { examinationFormDef } from '@/components/temporal/examination/db/client-side/structure/examination-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: examinationFormDef,
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
