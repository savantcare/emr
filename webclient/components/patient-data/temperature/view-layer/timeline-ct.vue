<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/view-appt-note/templates/timeline-structure.vue'
import { temperatureFormDef } from '@/components/patient-data/temperature/db/client-side/structure/temperature-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: temperatureFormDef,
    }
  },
}
</script>
