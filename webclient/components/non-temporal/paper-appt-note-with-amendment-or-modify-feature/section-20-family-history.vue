<template>
  <div>
    <contentDuringApptOfASingleCt
      :propApptId="propApptId"
      :propFormDef="formDef"
      :arrowDirection="arrowDirection"
    ></contentDuringApptOfASingleCt>
  </div>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/def-processors/view/time-series-of-appt-notes.vue'
import { familyHistoryFormDef } from '@/components/temporal/family-history/db/client-side/structure/family-history-of-a-patient-table.js'

export default {
  components: {
    contentDuringApptOfASingleCt,
  },
  props: {
    propApptId: {
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
