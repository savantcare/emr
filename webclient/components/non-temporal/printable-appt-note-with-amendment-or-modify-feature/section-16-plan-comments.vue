<template>
  <div>
    <printNote :propApptId="propApptId" :propFormDef="formDef"></printNote>
  </div>
</template>

<script>
import printNote from '@/components/temporal/1-framework/print-layer/paper.vue'
import { planCommentsFormDef } from '@/components/temporal/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'

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
      formDef: planCommentsFormDef,
    }
  },
}
</script>
