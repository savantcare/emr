<template>
  <ctAddForm :_formDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import { medicalHistoryFormDef } from '@/components/patient-data/medical-history/db/client-side/structure/medical-history-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: medicalHistoryFormDef,
    }
  },

  mounted() {
    //    console.log(this.dataFormFields)
  },

  components: {
    ctAddForm,
  },
}
</script>
