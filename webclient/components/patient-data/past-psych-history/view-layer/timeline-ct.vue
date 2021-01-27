<!-- Reference implementation -->
<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/view-appt-note/templates/generic-timeline-structure.vue'
import { familyHistoryFormDef } from '@/components/patient-data/family-history/db/client-side/structure/family-history-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: familyHistoryFormDef,
    }
  },
}
</script>
