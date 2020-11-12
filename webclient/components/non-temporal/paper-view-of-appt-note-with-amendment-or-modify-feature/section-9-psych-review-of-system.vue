<template>
  <div>
    <contentDuringApptOfASingleCt :_apptId="_apptId" :_formDef="formDef"></contentDuringApptOfASingleCt>
  </div>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/def-processors/view/content-during-appt-of-a-single-ct.vue'
import psychReviewOfSystemAllSelectOptionsTbl from '~/components/temporal/psych-review-of-system/db/client-side/structure/psych-review-of-system-all-select-options.js'
import { psychReviewOfSystemFormDef } from '@/components/temporal/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'

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
      formDef: psychReviewOfSystemFormDef,
    }
  },
  created() {},
}
</script>
