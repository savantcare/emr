<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <fieldMultiValuesAdd :propCtDef="ctDef"></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/temporal/1-framework/edit-layer/add-structure.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.recommendationsCtDef,
    }
  },

  components: {
    fieldMultiValuesAdd,
  },
}
</script>
