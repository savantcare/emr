<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/note-view/template/timeline-structure.vue'
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
