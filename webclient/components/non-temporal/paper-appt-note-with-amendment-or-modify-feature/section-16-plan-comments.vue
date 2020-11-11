<template>
  <div>
    <contentDuringApptOfASingleCt :_apptId="_apptId" :_formDef="formDef"></contentDuringApptOfASingleCt>
  </div>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/def-processors/view/content-during-appt-of-a-single-ct.vue'
import { planCommentsFormDef } from '@/components/temporal/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'

export default {
  components: {
    contentDuringApptOfASingleCt,
  },
  props: {
    _apptId: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      formDef: planCommentsFormDef,
    }
  },
}
</script>
