<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <fieldMultiValuesAdd :propCtDef="ctDef"></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/1time-eachField-multiValues/common/edit-layer/add-ct.vue'

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
