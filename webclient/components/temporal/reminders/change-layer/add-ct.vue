<!-- Reference implementation -->
<!-- For design see webclient/cts/def-processors/crud/forms.md -->
<template>
  <ctAddStructure :_formDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//papers/note-change/templates/add-form.vue'
import { remindersFormDef } from '@/components/temporal/reminders/db/client-side/structure/reminders-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: remindersFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
