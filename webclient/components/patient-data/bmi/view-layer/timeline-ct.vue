<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/view-appt-note/templates/generic-timeline-structure.vue'
import { bmiFormDef } from '@/components/patient-data/bmi/db/client-side/structure/bmi-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: bmiFormDef,
    }
  },
}
</script>
