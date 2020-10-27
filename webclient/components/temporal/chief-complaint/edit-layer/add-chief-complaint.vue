<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <ctAddStructure :propFormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/add-form.vue'

export default {
  data: function () {
    return {
      formDef: process.env.chiefComplaintFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
