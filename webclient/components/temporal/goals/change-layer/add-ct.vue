<!-- Reference implementation -->
<!-- For design see webclient/cts/framework/crud/forms.md -->
<template>
  <ctAddStructure :propFormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//framework/change/add-form.vue'
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
