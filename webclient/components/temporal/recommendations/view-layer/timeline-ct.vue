<!-- Reference implementation -->
<template>
  <timeLineView :propCtDef="ctDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components/temporal/1-framework/view-layer/timeline-structure.vue'
import { recommendationsCtDef } from '@/components/temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      ctDef: recommendationsCtDef,
    }
  },
}
</script>
