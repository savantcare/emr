<template>
  <div>
    <contentDuringApptOfASingleCt
      :_ApptId="_ApptId"
      :_formDef="formDef"
      :arrowDirection="arrowDirection"
    ></contentDuringApptOfASingleCt>
  </div>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/def-processors/view/content-during-appt-of-a-single-ct.vue'
import { familyHistoryFormDef } from '@/components/temporal/family-history/db/client-side/structure/family-history-of-a-patient-table.js'

export default {
  components: {
    contentDuringApptOfASingleCt,
  },
  props: {
    _ApptId: {
      type: Number,
      required: true,
    },
    arrowDirection: {
      type: Number,
    },
  },
  data: function () {
    return {
      formDef: familyHistoryFormDef,
    }
  },
}
</script>
