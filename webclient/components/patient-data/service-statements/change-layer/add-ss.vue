<template>
  <ctAddForm :_formDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
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
    ctAddForm,
  },
}
</script>
