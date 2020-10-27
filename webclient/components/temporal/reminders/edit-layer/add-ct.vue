<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <ctAddStructure :propFormDef="ctDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/add-form.vue'
import { remindersFormDef } from '@/components/temporal/reminders/db/client-side/structure/reminders-of-a-patient-table.js'

export default {
  data: function () {
    return {
      ctDef: remindersFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
