<template>
  <div>
    <printNote :propApptId="propApptId" :propFormDef="ctDef"></printNote>
  </div>
</template>

<script>
import printNote from '@/components/temporal/1-framework/print-layer/paper.vue'
import { recommendationsFormDef } from '@/components/temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'

export default {
  components: {
    printNote,
  },
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      ctDef: recommendationsFormDef,
    }
  },
}
</script>
