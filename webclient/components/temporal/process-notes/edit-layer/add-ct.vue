<template>
  <ctAddStructure :propCtDef="ctDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/add-structure.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.processNotesCtDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
