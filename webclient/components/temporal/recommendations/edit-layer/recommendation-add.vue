<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <ctAddForm :propFormDef="ctDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components/temporal/1-framework/edit-layer/add-form.vue'
import { recommendationsFormDef } from '@/components/temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'

export default {
  data: function () {
    return {
      ctDef: recommendationsFormDef,
    }
  },

  components: {
    ctAddForm,
  },
}
</script>
