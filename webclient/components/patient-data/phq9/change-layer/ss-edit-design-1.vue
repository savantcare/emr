<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="firstProp"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import phq9AllSelectOptionsTbl from '../db/client-side/structure/phq9-all-select-options.js'
import phq9OfAPatientTbl from '@/components/patient-data/phq9/db/client-side/structure/phq9-of-a-patient-table.js'
import { phq9FormDef } from '@/components/patient-data/phq9/db/client-side/structure/phq9-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: phq9FormDef,
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

  created() {},

  components: {
    ctEditFormTemplate,
  },
}
</script>
