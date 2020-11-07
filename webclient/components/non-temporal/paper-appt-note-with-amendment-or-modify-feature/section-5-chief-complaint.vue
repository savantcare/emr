<template>
  <div>
    <paperNote :propApptId="propApptId" :propFormDef="formDef" :arrowDirection="arrowDirection"></paperNote>
  </div>
</template>

<script>
import paperNote from '@/components/def-processors/view/paper.vue'
import { chiefComplaintFormDef } from '@/components/temporal/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'

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
      formDef: chiefComplaintFormDef,
    }
  },
}
</script>
