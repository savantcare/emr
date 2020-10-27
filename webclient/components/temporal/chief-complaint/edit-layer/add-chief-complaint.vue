<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <ctAddStructure :propFormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/add-form.vue'
import { chiefComplaintFormDef } from '@/components/temporal/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: chiefComplaintFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
