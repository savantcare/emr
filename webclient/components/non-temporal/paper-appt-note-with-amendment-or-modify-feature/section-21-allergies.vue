<template>
  <div>
    <contentDuringApptOfASingleCt :_ApptId="_ApptId" :_formDef="formDef"></contentDuringApptOfASingleCt>
  </div>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/def-processors/view/content-during-appt-of-a-single-ct.vue'
import { allergiesFormDef } from '@/components/temporal/allergies/db/client-side/structure/allergies-of-a-patient-table.js'

export default {
  components: {
    contentDuringApptOfASingleCt,
  },
  props: {
    _ApptId: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      formDef: allergiesFormDef,
    }
  },
}
</script>
