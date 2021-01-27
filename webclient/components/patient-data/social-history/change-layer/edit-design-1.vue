<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
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
    ctEditFormTemplate,
  },
}
</script>
