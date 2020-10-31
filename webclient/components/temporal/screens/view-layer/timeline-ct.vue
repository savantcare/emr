<!-- Reference implementation -->
<template>
  <timeLineView :propFormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//framework/view/timeline-structure.vue'
import { screensFormDef } from '@/components/temporal/screens/db/client-side/structure/screens-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: screensFormDef,
    }
  },
  components: { timeLineView },
}
</script>
