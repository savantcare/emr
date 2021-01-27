<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/view-appt-note/templates/timeline-structure.vue'
import { allergiesFormDef } from '@/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: allergiesFormDef,
    }
  },
}
</script>
