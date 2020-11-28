<template>
  <ctAddStructure :_formDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//papers/note-change/templates/add-form.vue'
import { weightFormDef } from '@/components/patient-data/weight/db/client-side/structure/weight-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: weightFormDef,
    }
  },
  components: {
    ctAddStructure,
  },
}
</script>
