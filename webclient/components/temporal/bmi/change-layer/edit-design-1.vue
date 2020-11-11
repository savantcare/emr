<template>
  <ctEditStructure :_FormDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//def-processors/change/edit-form.vue'
import { bmiFormDef } from '@/components/temporal/bmi/db/client-side/structure/bmi-of-a-patient-table.js'

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
    ctEditStructure,
  },
}
</script>
