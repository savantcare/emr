<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/view-appt-note/templates/generic-timeline-structure.vue'
import { chiefComplaintFormDef } from '@/components/patient-data/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: chiefComplaintFormDef,
    }
  },
}
</script>
