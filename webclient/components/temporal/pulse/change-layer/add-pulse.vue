<template>
  <ctAddStructure :propFormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//def-processors/change/add-form.vue'
import { pulseFormDef } from '@/components/temporal/pulse/db/client-side/structure/pulse-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: pulseFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
