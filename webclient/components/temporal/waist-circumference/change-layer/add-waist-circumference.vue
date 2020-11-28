<template>
  <ctAddStructure :_formDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//papers/note-change/templates/add-form.vue'
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
