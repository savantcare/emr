<template>
  <fieldMultiValuesAdd :propCtDef="ctDef"></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/temporal/1-framework/edit-layer/add-ct.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.allergiesCtDef,
    }
  },

  components: {
    fieldMultiValuesAdd,
  },
}
</script>
