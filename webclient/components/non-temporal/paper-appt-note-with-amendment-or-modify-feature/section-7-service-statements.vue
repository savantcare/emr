<template>
  <div>
    <contentDuringApptOfASingleCt :_ApptId="_ApptId" :_FormDef="formDef"></contentDuringApptOfASingleCt>
  </div>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/def-processors/view/content-during-appt-of-a-single-ct.vue'
import serviceStatementsAllSelectOptionsTbl from '~/components/temporal/service-statements/db/client-side/structure/service-statements-all-select-options.js'
import { serviceStatementsFormDef } from '@/components/temporal/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

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
      formDef: serviceStatementsFormDef,
    }
  },
  created() {},
}
</script>
