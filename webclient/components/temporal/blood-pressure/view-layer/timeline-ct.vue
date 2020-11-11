<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
import { bloodPressureFormDef } from '@/components/temporal/blood-pressure/db/client-side/structure/blood-pressure-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: bloodPressureFormDef,
    }
  },
}
</script>
