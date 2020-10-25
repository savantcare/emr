<!-- Reference implementation -->
<template>
  <timeLineView :propCtDef="ctDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components/temporal/1-framework/view-layer/timeline-ct.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.remindersCtDef,
    }
  },
  components: { timeLineView },
}
</script>
