<template>
  <ctAddStructure :_formDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//papers/note-change/templates/add-form.vue'
import { bmiFormDef } from '@/components/temporal/bmi/db/client-side/structure/bmi-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: bmiFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
