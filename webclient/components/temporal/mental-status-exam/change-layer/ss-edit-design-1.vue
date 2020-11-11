<template>
  <ctEditStructure :_formDef="formDef" :firstProp="firstProp"></ctEditStructure>
</template>

<script>
import ctEditStructure from '@/components//def-processors/change/edit-form.vue'
import mentalStatusExamAllSelectOptionsTbl from '../db/client-side/structure/mental-status-exam-all-select-options.js'
import mentalStatusExamOfAPatientTbl from '@/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-of-a-patient-table.js'
import { mentalStatusExamFormDef } from '@/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: mentalStatusExamFormDef,
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
