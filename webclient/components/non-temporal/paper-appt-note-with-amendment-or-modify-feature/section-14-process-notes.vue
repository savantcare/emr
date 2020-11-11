<template>
  <div>
    <contentDuringApptOfASingleCt :_ApptId="_ApptId" :_FormDef="formDef"></contentDuringApptOfASingleCt>
  </div>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/def-processors/view/content-during-appt-of-a-single-ct.vue'
import { processNotesFormDef } from '@/components/temporal/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'

export default {
  components: {
    contentDuringApptOfASingleCt,
  },
  props: {
    _ApptId: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      formDef: processNotesFormDef,
    }
  },
}
</script>
