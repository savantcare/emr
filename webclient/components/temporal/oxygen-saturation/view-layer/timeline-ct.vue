<template>
  <timeLineView :_FormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
import { oxygenSaturationFormDef } from '@/components/temporal/oxygen-saturation/db/client-side/structure/oxygen-saturation-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: oxygenSaturationFormDef,
    }
  },
}
</script>
