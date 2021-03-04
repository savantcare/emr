<!-- Reference implementation -->
<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/view-appt-note/templates/generic-timeline-structure.vue'
import { pastPsychHistoryFormDef } from '@/components/patient-data/past-psych-history/db/client-side/structure/past-psych-history-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: pastPsychHistoryFormDef,
    }
  },
}
</script>
