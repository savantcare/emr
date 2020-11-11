<!-- Reference implementation -->
<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
import { processNotesFormDef } from '@/components/temporal/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: planCommentsFormDef,
    }
  },
}
</script>
