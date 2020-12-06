<template>
  <ctEditStructure :_formDef="formDef" :firstProp="_rowIdForEdit"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//papers/note-change/templates/edit-form.vue'
import { socialHistoryFormDef } from '@/components/patient-data/social-history/db/client-side/structure/social-history-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: socialHistoryFormDef,
    }
  },
  props: {
    _rowIdForEdit: {
      type: Number,
    },
  },

  mounted() {
    //    console.log(this.dataFormFields)
  },

  components: {
    ctEditStructure,
  },
}
</script>
