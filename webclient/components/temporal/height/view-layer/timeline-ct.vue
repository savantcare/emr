<template>
  <timeLineView :propFormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
import { heightFormDef } from '@/components/temporal/height/db/client-side/structure/height-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: heightFormDef,
    }
  },
}
</script>
