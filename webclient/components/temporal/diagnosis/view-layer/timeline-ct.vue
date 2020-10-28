<!-- Reference implementation -->
<template>
  <timeLineView :propFormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//framework/view/timeline-structure.vue'
import { diagnosisFormDef } from '@/components/temporal/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: diagnosisFormDef,
    }
  },
}
</script>
