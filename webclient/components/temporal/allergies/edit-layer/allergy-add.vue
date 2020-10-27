<template>
  <ctAddStructure :propCtDef="ctDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/add-form.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.allergiesCtDef,
    }
  },

  components: {
    ctAddStructure,
  },
}
</script>
