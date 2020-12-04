<template>
  <ctAddForm :_formDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import examinationOfAPatientTbl from '@/components/patient-data/examination/db/client-side/structure/examination-of-a-patient-table.js'

import { examinationFormDef } from '@/components/patient-data/examination/db/client-side/structure/examination-of-a-patient-table.js'

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
    ctAddForm,
  },
}
</script>
