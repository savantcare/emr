<template>
  <div>
    <contentDuringApptOfASingleCt :propApptId="propApptId" :propFormDef="formDef"></contentDuringApptOfASingleCt>
  </div>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/def-processors/view/time-series-of-appt-notes.vue'
import mentalStatusExamAllSelectOptionsTbl from '~/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-all-select-options.js'
import { mentalStatusExamFormDef } from '@/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-of-a-patient-table.js'

export default {
  components: {
    contentDuringApptOfASingleCt,
  },
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      formDef: mentalStatusExamFormDef,
    }
  },
  created() {},
}
</script>
