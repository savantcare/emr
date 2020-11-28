<template>
  <ctAddStructure :_formDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//papers/note-change/templates/add-form.vue'
import serviceStatementsAllSelectOptionsTbl from '../db/client-side/structure/service-statements-all-select-options.js'
import serviceStatementsOfAPatientTbl from '@/components/patient-data/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

import { serviceStatementsFormDef } from '@/components/patient-data/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: serviceStatementsFormDef,
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
