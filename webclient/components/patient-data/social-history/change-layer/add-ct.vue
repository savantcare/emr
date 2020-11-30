<template>
  <ctAddStructure :_formDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//papers/note-change/templates/add-form.vue'
import { planCommentsFormDef } from '@/components/patient-data/social-history/db/client-side/structure/social-history-of-a-patient-table.js'

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
