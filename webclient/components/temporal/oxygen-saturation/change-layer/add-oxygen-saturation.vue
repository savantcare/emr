<template>
  <ctAddStructure :_formDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//def-processors/change/add-form.vue'
import { oxygenSaturationFormDef } from '@/components/temporal/oxygen-saturation/db/client-side/structure/oxygen-saturation-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: oxygenSaturationFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
