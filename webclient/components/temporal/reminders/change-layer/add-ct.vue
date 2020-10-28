<!-- Reference implementation -->
<!-- For design see webclient/cts/framework/crud/forms.md -->
<template>
  <ctAddStructure :propFormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//framework/change/add-form.vue'
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
