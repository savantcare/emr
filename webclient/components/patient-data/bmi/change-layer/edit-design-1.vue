<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="firstProp"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { bmiFormDef } from '@/components/patient-data/bmi/db/client-side/structure/bmi-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: bmiFormDef,
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
