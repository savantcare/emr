<!-- Reference implementation -->
<!-- For design see webclient/cts/framework/crud/forms.md -->
<template>
  <ctAddForm :propFormDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//framework/change/add-form.vue'
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
