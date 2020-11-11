<template>
  <ctEditStructure :_FormDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//def-processors/change/edit-form.vue'
import phq9AllSelectOptionsTbl from '../db/client-side/structure/phq9-all-select-options.js'
import phq9OfAPatientTbl from '@/components/temporal/phq9/db/client-side/structure/phq9-of-a-patient-table.js'
import { phq9FormDef } from '@/components/temporal/phq9/db/client-side/structure/phq9-of-a-patient-table.js'

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
    ctEditStructure,
  },
}
</script>
