<template>
  <ctAddForm :_formDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import phq9AllSelectOptionsTbl from '../db/client-side/structure/phq9-all-select-options.js'
import phq9OfAPatientTbl from '@/components/patient-data/phq9/db/client-side/structure/phq9-of-a-patient-table.js'

import { phq9FormDef } from '@/components/patient-data/phq9/db/client-side/structure/phq9-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: phq9FormDef,
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
