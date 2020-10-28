<!-- Reference implementation -->
<template>
  <timeLineView :propFormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components/temporal/1-framework/view-layer/timeline-structure.vue'
import { nameFormDef } from '@/components/temporal/name/db/client-side/structure/name-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: nameFormDef,
    }
  },
  components: { timeLineView },
}
</script>
