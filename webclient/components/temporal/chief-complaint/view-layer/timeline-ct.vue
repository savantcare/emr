<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/note-view/template/timeline-structure.vue'
import { chiefComplaintFormDef } from '@/components/temporal/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: chiefComplaintFormDef,
    }
  },
}
</script>
