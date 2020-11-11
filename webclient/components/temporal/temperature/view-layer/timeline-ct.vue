<template>
  <timeLineView :_FormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
import { temperatureFormDef } from '@/components/temporal/temperature/db/client-side/structure/temperature-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: temperatureFormDef,
    }
  },
}
</script>
