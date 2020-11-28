<!-- Reference implementation -->
<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/note-view/templates/timeline-structure.vue'
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
