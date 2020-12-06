<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="firstProp"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/note-change/templates/edit-form.vue'
import { processNotesFormDef } from '@/components/patient-data/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: processNotesFormDef,
    }
  },
  props: {
    firstProp: {
      type: Number,
    },
  },

  mounted() {
    //    console.log(this.dataFormFields)
  },

  components: {
    ctEditFormTemplate,
  },
}
</script>
