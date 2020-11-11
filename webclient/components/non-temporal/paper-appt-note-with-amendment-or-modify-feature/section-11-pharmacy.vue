<template>
  <div>
    <contentDuringApptOfASingleCt :_ApptId="_ApptId" :_formDef="formDef"></contentDuringApptOfASingleCt>
  </div>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/def-processors/view/content-during-appt-of-a-single-ct.vue'
import { remindersFormDef } from '@/components/temporal/reminders/db/client-side/structure/reminders-of-a-patient-table.js'

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
      formDef: remindersFormDef,
    }
  },
}
</script>
