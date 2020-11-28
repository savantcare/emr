<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/note-view/templates/timeline-structure.vue'
import { heightFormDef } from '@/components/patient-data/height/db/client-side/structure/height-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: heightFormDef,
    }
  },
}
</script>
