<template>
  <timeLineView :_FormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
import { bmiFormDef } from '@/components/temporal/bmi/db/client-side/structure/bmi-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: bmiFormDef,
    }
  },
}
</script>
