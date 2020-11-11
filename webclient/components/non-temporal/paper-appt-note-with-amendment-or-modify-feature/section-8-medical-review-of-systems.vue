<template>
  <div>
    <contentDuringApptOfASingleCt :_apptId="_apptId" :_formDef="formDef"></contentDuringApptOfASingleCt>
  </div>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/def-processors/view/content-during-appt-of-a-single-ct.vue'
import medicalReviewOfSystemAllSelectOptionsTbl from '~/components/temporal/medical-review-of-system/db/client-side/structure/medical-review-of-system-all-select-options.js'
import { medicalReviewOfSystemFormDef } from '@/components/temporal/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'

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
      formDef: medicalReviewOfSystemFormDef,
    }
  },
  created() {},
}
</script>
