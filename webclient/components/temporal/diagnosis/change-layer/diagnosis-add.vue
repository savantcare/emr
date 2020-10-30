<!-- Reference implementation -->
<!-- For design see webclient/cts/framework/crud/forms.md -->
<template>
  <ctAddStructure :propFormDef="formDef"> </ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//framework/change/add-form.vue'
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
