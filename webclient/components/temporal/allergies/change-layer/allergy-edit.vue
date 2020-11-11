<template>
  <ctEditStructure :_formDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//def-processors/change/edit-form.vue'
import { allergiesFormDef } from '@/components/temporal/allergies/db/client-side/structure/allergies-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: allergiesFormDef,
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
