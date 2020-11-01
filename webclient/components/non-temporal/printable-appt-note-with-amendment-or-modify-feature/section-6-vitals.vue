<template>
  <div>
    <printNote :propApptId="propApptId" :propFormDef="weightFormDef"></printNote>
    <printNote :propApptId="propApptId" :propFormDef="heightFormDef"></printNote>
  </div>
</template>

<script>
import printNote from '@/components/def-processors/view/paper.vue'
import { weightFormDef } from '@/components/temporal/weight/db/client-side/structure/weight-of-a-patient-table.js'
import { heightFormDef } from '@/components/temporal/height/db/client-side/structure/height-of-a-patient-table.js'

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
      weightFormDef: weightFormDef,
      heightFormDef: heightFormDef,
    }
  },
}
</script>
