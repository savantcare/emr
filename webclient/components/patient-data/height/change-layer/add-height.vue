<template>
  <ctAddStructure :_formDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//papers/note-change/templates/add-form.vue'
import { heightFormDef } from '@/components/patient-data/height/db/client-side/structure/height-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: heightFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
