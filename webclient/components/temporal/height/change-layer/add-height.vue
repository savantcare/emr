<template>
  <ctAddStructure :_FormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//def-processors/change/add-form.vue'
import { heightFormDef } from '@/components/temporal/height/db/client-side/structure/height-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: heightFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
