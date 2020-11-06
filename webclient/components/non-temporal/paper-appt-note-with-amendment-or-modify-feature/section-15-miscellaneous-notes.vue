<template>
  <div>
    <paperNote :propApptId="propApptId" :propFormDef="formDef"></paperNote>
  </div>
</template>

<script>
import paperNote from '@/components/def-processors/view/paper.vue'
import { miscellaneousNotesFormDef } from '@/components/temporal/miscellaneous-notes/db/client-side/structure/miscellaneous-notes-of-a-patient-table.js'

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
      formDef: miscellaneousNotesFormDef,
    }
  },
}
</script>
