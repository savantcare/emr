<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <ctAddForm :propCtDef="ctDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components/temporal/1-framework/edit-layer/add-form.vue'
import { recommendationsCtDef } from '@/components/temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'

export default {
  data: function () {
    return {
      ctDef: recommendationsCtDef,
    }
  },

  components: {
    ctAddForm,
  },
}
</script>
