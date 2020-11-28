<!-- Reference implementation -->
<!-- For design see webclient/cts/def-processors/crud/forms.md -->
<template>
  <ctAddStructure :_formDef="formDef"> </ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//papers/note-change/templates/add-form.vue'
import { diagnosisFormDef } from '@/components/temporal/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: diagnosisFormDef,
    }
  },

  components: {
    ctAddStructure,
  },
  created() {},
  computed: {},
}
</script>
