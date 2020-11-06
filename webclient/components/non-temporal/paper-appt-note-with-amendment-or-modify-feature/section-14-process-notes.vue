<template>
  <div>
    <paperNote :propApptId="propApptId" :propFormDef="formDef"></paperNote>
  </div>
</template>

<script>
import paperNote from '@/components/def-processors/view/paper.vue'
import { processNotesFormDef } from '@/components/temporal/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'

export default {
  components: {
    paperNote,
  },
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      formDef: processNotesFormDef,
    }
  },
}
</script>
