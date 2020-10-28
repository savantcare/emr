<template>
  <div>
    <printNote :propApptId="propApptId" :propFormDef="formDef"></printNote>
  </div>
</template>

<script>
import printNote from '@/components/framework/print-layer/paper.vue'
import { familyHistoryFormDef } from '@/components/temporal/family-history/db/client-side/structure/family-history-of-a-patient-table.js'

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
      formDef: familyHistoryFormDef,
    }
  },
}
</script>
