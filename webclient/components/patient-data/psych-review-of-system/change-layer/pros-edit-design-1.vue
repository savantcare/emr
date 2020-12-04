<template>
  <ctEditStructure :_formDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//papers/note-change/templates/edit-form.vue'
import psychReviewOfSystemsOfAPatientTbl from '@/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'
import { psychReviewOfSystemFormDef } from '@/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: psychReviewOfSystemFormDef,
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
