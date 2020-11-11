<template>
  <ctEditStructure :_formDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//def-processors/change/edit-form.vue'
import { screensFormDef } from '@/components/temporal/screens/db/client-side/structure/screens-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: screensFormDef,
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
