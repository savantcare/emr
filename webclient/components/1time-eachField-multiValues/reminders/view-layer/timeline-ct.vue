<!-- Reference implementation -->
<template>
  <timeLineView :propCtDef="ctDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components/1time-eachField-multiValues/common/view-layer/timeline-ct.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.remindersCtDef,
    }
  },
  components: { timeLineView },
}
</script>
