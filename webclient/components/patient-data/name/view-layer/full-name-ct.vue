<!-- Reference implementation -->
<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/view-appt-note/templates/generic-timeline-structure.vue'
import { nameFormDef } from '@/components/patient-data/name/db/client-side/structure/name-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: nameFormDef,
    }
  },
  components: { timeLineView },
}
</script>
