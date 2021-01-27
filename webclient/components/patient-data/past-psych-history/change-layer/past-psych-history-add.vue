<template>
  <ctAddForm :_formDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import { pastPsychHistoryFormDef } from '@/components/patient-data/past-psych-history/db/client-side/structure/past-psych-history-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: pastPsychHistoryFormDef,
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
