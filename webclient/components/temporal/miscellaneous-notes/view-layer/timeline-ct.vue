<!-- Reference implementation -->
<template>
  <timeLineView :propFormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components/temporal/1-framework/view-layer/timeline-structure.vue'
import { miscellaneousNotesFormDef } from '@/components/temporal/miscellaneous-notes/db/client-side/structure/miscellaneous-notes-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: miscellaneousNotesFormDef,
    }
  },
}
</script>
