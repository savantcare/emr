<!-- Reference implementation -->
<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/view-appt-note/templates/generic-timeline-structure.vue'
import { medicationOrderFormDef } from '@/components/patient-data/medication-orders/db/client-side/structure/medication-order-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: medicationOrderFormDef,
    }
  },
}
</script>
