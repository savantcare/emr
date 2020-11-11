<!-- Reference implementation -->
<template>
  <timeLineView :_FormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
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
