<template>
  <ctAddStructure :propFormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/add-form.vue'
import { processNotesFormDef } from '@/components/temporal/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: processNotesFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
