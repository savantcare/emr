<!-- Reference implementation -->
<!-- For design see webclient/cts/def-processors/crud/forms.md -->
<template>
  <ctAddForm :_formDef="formDef"> </ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import { diagnosisFormDef } from '@/components/patient-data/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: diagnosisFormDef,
    }
  },

  components: {
    ctAddForm,
  },
  created() {},
  computed: {},
}
</script>
