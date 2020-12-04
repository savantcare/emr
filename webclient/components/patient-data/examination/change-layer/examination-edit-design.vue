<template>
  <ctEditStructure :_formDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//papers/note-change/templates/edit-form.vue'
import examinationOfAPatientTbl from '@/components/patient-data/examination/db/client-side/structure/examination-of-a-patient-table.js'
import { examinationFormDef } from '@/components/patient-data/examination/db/client-side/structure/examination-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: examinationFormDef,
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

  created() {},

  components: {
    ctEditStructure,
  },
}
</script>
