<!-- Reference implementation -->
<template>
  <timeLineView :propFormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components/framework/view-layer/timeline-structure.vue'
import { recommendationsFormDef } from '@/components/temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: recommendationsFormDef,
    }
  },
}
</script>
