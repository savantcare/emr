<template>
  <div>
    <contentDuringApptOfASingleCt :_ApptId="_ApptId" :_FormDef="formDef"></contentDuringApptOfASingleCt>
  </div>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/def-processors/view/content-during-appt-of-a-single-ct.vue'
import { diagnosisFormDef } from '@/components/temporal/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'

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
      formDef: diagnosisFormDef,
    }
  },
}
</script>
