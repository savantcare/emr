<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/view-appt-note/templates/generic-timeline-structure.vue'
import { bloodSugarFormDef } from '@/components/patient-data/blood-sugar/db/client-side/structure/blood-sugar-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: bloodSugarFormDef,
    }
  },
}
</script>
