<template>
  <div>
    <paperNote :propApptId="propApptId" :propFormDef="formDef"></paperNote>
  </div>
</template>

<script>
import paperNote from '@/components/def-processors/view/paper.vue'
import { goalsFormDef } from '@/components/temporal/goals/db/client-side/structure/goals-of-a-patient-table.js'

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
      formDef: goalsFormDef,
    }
  },
}
</script>
