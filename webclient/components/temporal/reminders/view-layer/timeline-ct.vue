<!-- Reference implementation -->
<template>
  <timeLineView :propFormDef="ctDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components/temporal/1-framework/view-layer/timeline-structure.vue'
import { remindersFormDef } from '@/components/temporal/reminders/db/client-side/structure/reminders-of-a-patient-table.js'

export default {
  data: function () {
    return {
      ctDef: remindersFormDef,
    }
  },
  components: { timeLineView },
}
</script>
