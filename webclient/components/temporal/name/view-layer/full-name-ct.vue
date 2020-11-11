<!-- Reference implementation -->
<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
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
