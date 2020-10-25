<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <fieldMultiValuesAdd :propCtDef="ctDef"></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/temporal/common/edit-layer/add-ct.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.chiefComplaintCtDef,
    }
  },
  components: {
    fieldMultiValuesAdd,
  },
}
</script>
