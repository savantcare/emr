<template>
  <ctAddStructure :_formDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//def-processors/change/add-form.vue'
import { waistCircumferenceFormDef } from '@/components/temporal/waist-circumference/db/client-side/structure/waist-circumference-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: waistCircumferenceFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
