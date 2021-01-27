<!-- Reference implementation -->
<!-- For design see webclient/cts/def-processors/crud/forms.md -->
<template>
  <ctAddForm :_formDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import { remindersFormDef } from '@/components/patient-data/reminders/db/client-side/structure/reminders-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: remindersFormDef,
    }
  },
  components: {
    ctAddForm,
  },
}
</script>
