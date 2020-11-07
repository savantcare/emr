<template>
  <div>
    <paperNote :propApptId="propApptId" :propFormDef="formDef" :arrowDirection="arrowDirection"></paperNote>
  </div>
</template>

<script>
import paperNote from '@/components/def-processors/view/paper.vue'
import { familyHistoryFormDef } from '@/components/temporal/family-history/db/client-side/structure/family-history-of-a-patient-table.js'

export default {
  components: {
    paperNote,
  },
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
    arrowDirection: {
      type: Number,
    },
  },
  data: function () {
    return {
      formDef: familyHistoryFormDef,
    }
  },
}
</script>
