<!-- Reference implementation -->
<template>
  <timeLineView :propFormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components/temporal/1-framework/view-layer/timeline-structure.vue'
import { planCommentsFormDef } from '@/components/temporal/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: planCommentsFormDef,
    }
  },
}
</script>
