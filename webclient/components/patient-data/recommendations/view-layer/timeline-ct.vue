<!-- Reference implementation -->
<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/view-appt-note/templates/generic-timeline-structure.vue'
import { recommendationsFormDef } from '@/components/patient-data/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: recommendationsFormDef,
    }
  },
}
</script>
