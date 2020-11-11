<template>
  <ctAddStructure :_formDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//def-processors/change/add-form.vue'
import { weightFormDef } from '@/components/temporal/weight/db/client-side/structure/weight-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: weightFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
