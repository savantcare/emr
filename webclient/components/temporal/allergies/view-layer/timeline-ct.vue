<template>
  <timeLineView :propFormDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components/framework/view-layer/timeline-structure.vue'
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
