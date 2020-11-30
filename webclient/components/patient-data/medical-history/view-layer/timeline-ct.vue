<!-- Reference implementation -->
<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/note-view/templates/timeline-structure.vue'
import { medicalHistoryFormDef } from '@/components/patient-data/medical-history/db/client-side/structure/medical-history-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: medicalHistoryFormDef,
    }
  },
}
</script>
