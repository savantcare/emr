<template>
  <ctEditStructure :propFormDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//framework/change/edit-form.vue'
import { chiefComplaintFormDef } from '@/components/temporal/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: chiefComplaintFormDef,
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
