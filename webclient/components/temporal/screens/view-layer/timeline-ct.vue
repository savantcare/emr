<!-- Reference implementation -->
<template>
  <timeLineView :_FormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
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
