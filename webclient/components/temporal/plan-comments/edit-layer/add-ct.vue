<template>
  <ctAddStructure :propFormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/framework/edit-layer/add-form.vue'
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
