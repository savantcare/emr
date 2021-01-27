<template>
  <ctAddForm :_formDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import { socialHistoryFormDef } from '@/components/patient-data/social-history/db/client-side/structure/social-history-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: socialHistoryFormDef,
    }
  },

  components: {
    ctAddForm,
  },
}
</script>
