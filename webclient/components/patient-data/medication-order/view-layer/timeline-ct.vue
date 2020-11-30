<!-- Reference implementation -->
<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/note-view/templates/timeline-structure.vue'
import { medicalHistoryFormDef } from '@/components/patient-data/medication-order/db/client-side/structure/medication-order-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: medicalHistoryFormDef,
    }
  },
}
</script>
