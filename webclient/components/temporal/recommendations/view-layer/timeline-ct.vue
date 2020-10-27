<!-- Reference implementation -->
<template>
  <timeLineView :propFormDef="ctDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components/temporal/1-framework/view-layer/timeline-structure.vue'
import { recommendationsFormDef } from '@/components/temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      ctDef: recommendationsFormDef,
    }
  },
}
</script>
