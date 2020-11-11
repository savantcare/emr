<!-- Reference implementation -->
<!-- For design see webclient/cts/def-processors/crud/forms.md -->
<template>
  <ctAddForm :_FormDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//def-processors/change/add-form.vue'
import { recommendationsFormDef } from '@/components/temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: recommendationsFormDef,
    }
  },

  components: {
    ctAddForm,
  },
}
</script>
