<!-- Reference implementation -->
<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/note-view/templates/timeline-structure.vue'
import { planCommentsFormDef } from '@/components/patient-data/social-history/db/client-side/structure/social-history-of-a-patient-table.js'

export default {
  components: { timeLineView },
  data: function () {
    return {
      formDef: planCommentsFormDef,
    }
  },
}
</script>
