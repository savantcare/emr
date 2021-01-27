<template>
  <ctAddForm :_formDef="formDef" :firstProp="firstProp"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/edit-form.vue'
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
    //    console.log(this.dataFormFields)
  },

  components: {
    ctAddForm,
  },
}
</script>
