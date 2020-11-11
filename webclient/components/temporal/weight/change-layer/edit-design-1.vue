<template>
  <ctEditStructure :_FormDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//def-processors/change/edit-form.vue'
import { weightFormDef } from '@/components/temporal/weight/db/client-side/structure/weight-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: weightFormDef,
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
