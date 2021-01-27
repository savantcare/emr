<template>
  <ctAddForm :_formDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import { familyHistoryFormDef } from '@/components/patient-data/family-history/db/client-side/structure/family-history-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: familyHistoryFormDef,
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
