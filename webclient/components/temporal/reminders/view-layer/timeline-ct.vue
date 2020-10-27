<!-- Reference implementation -->
<template>
  <timeLineView :propFormDef="ctDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components/temporal/1-framework/view-layer/timeline-structure.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.remindersCtDef,
    }
  },
  components: { timeLineView },
}
</script>
