<template>
  <ctAddStructure :propFormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/add-form.vue'
import { miscellaneousNotesFormDef } from '@/components/temporal/miscellaneous-notes/db/client-side/structure/miscellaneous-notes-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: miscellaneousNotesFormDef,
    }
  },

  components: {
    ctAddStructure,
  },
}
</script>
