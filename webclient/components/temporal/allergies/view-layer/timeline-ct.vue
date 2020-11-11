<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//def-processors/view/timeline-structure.vue'
import { allergiesFormDef } from '@/components/temporal/allergies/db/client-side/structure/allergies-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: allergiesFormDef,
    }
  },
}
</script>
