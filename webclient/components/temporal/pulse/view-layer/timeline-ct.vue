<template>
  <timeLineView :_FormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
import { pulseFormDef } from '@/components/temporal/pulse/db/client-side/structure/pulse-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: pulseFormDef,
    }
  },
}
</script>
