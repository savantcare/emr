<template>
  <div>
    <paperNote :propApptId="propApptId" :propFormDef="formDef"></paperNote>
  </div>
</template>

<script>
import paperNote from '@/components/def-processors/view/paper.vue'
import { diagnosisFormDef } from '@/components/temporal/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'

export default {
  components: {
    paperNote,
  },
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      formDef: diagnosisFormDef,
    }
  },
}
</script>
