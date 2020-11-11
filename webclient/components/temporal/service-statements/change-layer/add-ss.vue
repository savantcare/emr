<template>
  <ctAddStructure :_FormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//def-processors/change/add-form.vue'
import serviceStatementsAllSelectOptionsTbl from '../db/client-side/structure/service-statements-all-select-options.js'
import serviceStatementsOfAPatientTbl from '@/components/temporal/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

import { serviceStatementsFormDef } from '@/components/temporal/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

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
