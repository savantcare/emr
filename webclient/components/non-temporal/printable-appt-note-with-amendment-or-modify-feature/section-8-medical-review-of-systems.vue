<template>
  <div>
    <printNote :propApptId="propApptId" :propFormDef="formDef"></printNote>
  </div>
</template>

<script>
import printNote from '@/components/def-processors/view/paper.vue'
import medicalReviewOfSystemAllSelectOptionsTbl from '~/components/temporal/medical-review-of-system/db/client-side/structure/medical-review-of-system-all-select-options.js'
import { medicalReviewOfSystemFormDef } from '@/components/temporal/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'

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
      formDef: medicalReviewOfSystemFormDef,
    }
  },
  created() {},
}
</script>
