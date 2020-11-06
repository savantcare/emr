<template>
  <div>
    <paperNote :propApptId="propApptId" :propFormDef="formDef"></paperNote>
  </div>
</template>

<script>
import paperNote from '@/components/def-processors/view/paper.vue'
import mentalStatusExamAllSelectOptionsTbl from '~/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-all-select-options.js'
import { mentalStatusExamFormDef } from '@/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-of-a-patient-table.js'

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
      formDef: mentalStatusExamFormDef,
    }
  },
  created() {},
}
</script>
