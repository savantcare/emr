<!-- Reference implementation -->
<template>
  <timeLineView :_FormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
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
