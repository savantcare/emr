<template>
  <ctEditStructure :propFormDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//def-processors/change/edit-form.vue'
import { waistCircumferenceFormDef } from '@/components/temporal/waist-circumference/db/client-side/structure/waist-circumference-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: waistCircumferenceFormDef,
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
