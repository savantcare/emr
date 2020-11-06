<template>
  <div>
    <printNote :propApptId="propApptId" :propFormDef="formDef"></printNote>
  </div>
</template>

<script>
import printNote from '@/components/def-processors/view/paper.vue'
import mentalStatusExamAllSelectOptionsTbl from '~/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-all-select-options.js'
import { mentalStatusExamFormDef } from '@/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-of-a-patient-table.js'

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
      formDef: mentalStatusExamFormDef,
    }
  },
  created() {},
}
</script>
