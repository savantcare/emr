<template>
  <ctEditStructure :_formDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//def-processors/change/edit-form.vue'
import { bloodPressureFormDef } from '@/components/temporal/blood-pressure/db/client-side/structure/blood-pressure-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: bloodPressureFormDef,
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
