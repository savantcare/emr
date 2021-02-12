<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="firstProp"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components/papers/change-appt-note/templates/edit-form.vue'
import { diagnosisFormDef } from '@/components/patient-data/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: diagnosisFormDef,
    }
  },
  props: {
    firstProp: {
      type: Number,
    },
  },

  mounted() {

  },

  components: {
    ctEditFormTemplate,
  },
}
</script>
