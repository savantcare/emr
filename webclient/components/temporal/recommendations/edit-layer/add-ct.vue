<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <ctAddStructure :propCtDef="ctDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/add-structure.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.recommendationsCtDef,
    }
  },

  components: {
    ctAddStructure,
  },
}
</script>
