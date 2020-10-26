<template>
  <fieldMultiValuesAdd :propCtDef="ctDef"></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/temporal/1-framework/edit-layer/add-structure.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.processNotesCtDef,
    }
  },
  components: {
    fieldMultiValuesAdd,
  },
}
</script>
