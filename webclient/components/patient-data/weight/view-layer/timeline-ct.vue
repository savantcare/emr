<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/view-appt-note/templates/timeline-structure.vue'
import { weightFormDef } from '@/components/patient-data/weight/db/client-side/structure/weight-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: weightFormDef,
    }
  },
}
</script>
