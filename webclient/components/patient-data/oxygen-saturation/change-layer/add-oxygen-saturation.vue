<template>
  <ctAddForm :_formDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import { oxygenSaturationFormDef } from '@/components/patient-data/oxygen-saturation/db/client-side/structure/oxygen-saturation-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: oxygenSaturationFormDef,
    }
  },
  components: {
    ctAddForm,
  },
}
</script>
