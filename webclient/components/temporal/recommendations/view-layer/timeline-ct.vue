<!-- Reference implementation -->
<template>
  <timeLineView :_FormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
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
