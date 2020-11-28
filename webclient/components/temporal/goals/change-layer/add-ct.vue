<!-- Reference implementation -->
<!-- For design see webclient/cts/def-processors/crud/forms.md -->
<template>
  <ctAddStructure :_formDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//papers/note-change/templates/add-form.vue'
import { goalsFormDef } from '@/components/temporal/goals/db/client-side/structure/goals-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: goalsFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
