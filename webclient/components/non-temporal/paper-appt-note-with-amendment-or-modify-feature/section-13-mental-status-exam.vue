<template>
  <div>
    <contentDuringApptOfASingleCt :_ApptId="_ApptId" :_formDef="formDef"></contentDuringApptOfASingleCt>
  </div>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/def-processors/view/content-during-appt-of-a-single-ct.vue'
import mentalStatusExamAllSelectOptionsTbl from '~/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-all-select-options.js'
import { mentalStatusExamFormDef } from '@/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-of-a-patient-table.js'

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
      formDef: mentalStatusExamFormDef,
    }
  },
  created() {},
}
</script>
