<template>
  <ctEditStructure :propFormDef="ctDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components/temporal/1-framework/edit-layer/edit-form.vue'
import { recommendationsFormDef } from '@/components/temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'

export default {
  data: function () {
    return {
      ctDef: recommendationsFormDef,
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
