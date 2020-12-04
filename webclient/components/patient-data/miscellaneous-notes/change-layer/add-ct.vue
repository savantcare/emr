<template>
  <ctAddForm :_formDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import { miscellaneousNotesFormDef } from '@/components/patient-data/miscellaneous-notes/db/client-side/structure/miscellaneous-notes-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: miscellaneousNotesFormDef,
    }
  },

  components: {
    ctAddForm,
  },
}
</script>
