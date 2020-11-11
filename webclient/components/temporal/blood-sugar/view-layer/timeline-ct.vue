<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
import { bloodSugarFormDef } from '@/components/temporal/blood-sugar/db/client-side/structure/blood-sugar-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: bloodSugarFormDef,
    }
  },
}
</script>
