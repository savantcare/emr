<template>
  <div>
    <paperNote :propApptId="propApptId" :propFormDef="formDef"></paperNote>
  </div>
</template>

<script>
import paperNote from '@/components/def-processors/view/time-series-of-appt-notes.vue'
import medicalReviewOfSystemAllSelectOptionsTbl from '~/components/temporal/medical-review-of-system/db/client-side/structure/medical-review-of-system-all-select-options.js'
import { medicalReviewOfSystemFormDef } from '@/components/temporal/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'

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
      formDef: medicalReviewOfSystemFormDef,
    }
  },
  created() {},
}
</script>
