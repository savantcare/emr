<!-- Reference implementation -->
<template>
  <timeLineView :propFormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components/temporal/1-framework/view-layer/timeline-structure.vue'
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
