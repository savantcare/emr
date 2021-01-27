<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="firstProp"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { medicalHistoryFormDef } from '@/components/patient-data/medical-history/db/client-side/structure/medical-history-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: medicalHistoryFormDef,
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
