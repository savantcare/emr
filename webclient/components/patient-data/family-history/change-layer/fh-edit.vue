<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="firstProp"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { familyHistoryFormDef } from '@/components/patient-data/family-history/db/client-side/structure/family-history-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: familyHistoryFormDef,
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
