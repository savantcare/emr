<template>
  <div>
    <printNote :propApptId="propApptId" :propFormDef="ctDef"></printNote>
  </div>
</template>

<script>
import printNote from '@/components/temporal/1-framework/print-layer/paper.vue'

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
      ctDef: process.env.planCommentsCtDef,
    }
  },
}
</script>
