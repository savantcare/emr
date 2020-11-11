<template>
  <ctAddStructure :_FormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//def-processors/change/add-form.vue'
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
