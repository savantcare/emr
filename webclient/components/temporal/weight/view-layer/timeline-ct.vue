<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/note-view/templates/timeline-structure.vue'
import { weightFormDef } from '@/components/temporal/weight/db/client-side/structure/weight-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: weightFormDef,
    }
  },
}
</script>
