<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/view-appt-note/templates/timeline-structure.vue'
import { oxygenSaturationFormDef } from '@/components/patient-data/oxygen-saturation/db/client-side/structure/oxygen-saturation-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: oxygenSaturationFormDef,
    }
  },
}
</script>
