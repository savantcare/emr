<!-- Reference implementation -->
<template>
  <timeLineView :_FormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
import { familyHistoryFormDef } from '@/components/temporal/family-history/db/client-side/structure/family-history-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: familyHistoryFormDef,
    }
  },
}
</script>
