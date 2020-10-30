<template>
  <div>
    <printNote :propApptId="propApptId" :propFormDef="formDef"></printNote>
  </div>
</template>

<script>
import printNote from '@/components/framework/view/paper.vue'
import psychReviewOfSystemAllSelectOptionsTbl from '~/components/temporal/psych-review-of-system/db/client-side/structure/psych-review-of-system-all-select-options.js'
import { psychReviewOfSystemFormDef } from '@/components/temporal/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'

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
      formDef: psychReviewOfSystemFormDef,
    }
  },
  created() {},
}
</script>
