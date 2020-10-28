<!-- Reference implementation -->
<template>
  <timeLineView :propFormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components/framework/view-layer/timeline-structure.vue'
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
