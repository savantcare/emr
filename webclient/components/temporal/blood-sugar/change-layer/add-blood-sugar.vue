<template>
  <ctAddStructure :propFormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//def-processors/change/add-form.vue'
import { bloodSugarFormDef } from '@/components/temporal/blood-sugar/db/client-side/structure/blood-sugar-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: bloodSugarFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
