<template>
  <ctEditStructure :propFormDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//framework/change/edit-form.vue'
import { pastPsychistoryFormDef } from '@/components/temporal/past-psych-history/db/client-side/structure/past-psych-history-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: pastPsychistoryFormDef,
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
