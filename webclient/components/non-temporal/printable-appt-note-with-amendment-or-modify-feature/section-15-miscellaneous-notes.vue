<template>
  <div>
    <printNote :propApptId="propApptId" :propFormDef="formDef"></printNote>
  </div>
</template>

<script>
import printNote from '@/components/temporal/1-framework/print-layer/paper.vue'
import { miscellaneousNotesFormDef } from '@/components/temporal/miscellaneous-notes/db/client-side/structure/miscellaneous-notes-of-a-patient-table.js'

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
      formDef: miscellaneousNotesFormDef,
    }
  },
}
</script>
