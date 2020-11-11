<template>
  <ctAddStructure :_FormDef="formDef"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components//def-processors/change/add-form.vue'
import { pastPsychHistoryFormDef } from '@/components/temporal/past-psych-history/db/client-side/structure/past-psych-history-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: pastPsychHistoryFormDef,
    }
  },

  mounted() {
    //    console.log(this.dataFormFields)
  },

  components: {
    ctAddStructure,
  },
}
</script>
