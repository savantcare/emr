<template>
  <ctAddStructure :_FormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//def-processors/change/add-form.vue'
import { planCommentsFormDef } from '@/components/temporal/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: planCommentsFormDef,
    }
  },

  components: {
    ctAddStructure,
  },
}
</script>
