<template>
  <timeLineView :_formDef="formDef"></timeLineView>
</template>

<script>
import timeLineView from '@/components//papers/note-view/template/timeline-structure.vue'
import { waistCircumferenceFormDef } from '@/components/temporal/waist-circumference/db/client-side/structure/waist-circumference-of-a-patient-table.js'

export default {
  components: { timeLineView },

  data: function () {
    return {
      formDef: waistCircumferenceFormDef,
    }
  },
}
</script>
