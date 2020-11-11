<!-- Reference implementation -->
<!-- For design see webclient/cts/def-processors/crud/forms.md -->
<template>
  <ctAddStructure :_formDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//def-processors/change/add-form.vue'
import { screensFormDef } from '@/components/temporal/screens/db/client-side/structure/screens-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: screensFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
