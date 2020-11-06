<template>
  <div>
    <printNote :propApptId="propApptId" :propFormDef="formDef"></printNote>
  </div>
</template>

<script>
import printNote from '@/components/def-processors/view/paper.vue'
import { chiefComplaintFormDef } from '@/components/temporal/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'

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
      formDef: chiefComplaintFormDef,
    }
  },
}
</script>
