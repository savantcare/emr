<template>
  <ctAddStructure :propFormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//def-processors/change/add-form.vue'
import { temperatureFormDef } from '@/components/temporal/temperature/db/client-side/structure/temperature-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: temperatureFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
