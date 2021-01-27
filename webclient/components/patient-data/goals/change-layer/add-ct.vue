<!-- Reference implementation -->
<!-- For design see webclient/cts/def-processors/crud/forms.md -->
<template>
  <ctAddForm :_formDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import { goalsFormDef } from '@/components/patient-data/goals/db/client-side/structure/goals-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: goalsFormDef,
    }
  },
  components: {
    ctAddForm,
  },
}
</script>
