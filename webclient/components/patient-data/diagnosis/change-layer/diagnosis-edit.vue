<template>
  <ctAddStructure :_formDef="formDef" :firstProp="firstProp"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//papers/note-change/templates/edit-form.vue'
import { diagnosisFormDef } from '@/components/patient-data/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: diagnosisFormDef,
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
    ctAddStructure,
  },
}
</script>
